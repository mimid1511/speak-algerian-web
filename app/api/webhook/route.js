// app/api/webhook/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { addProduct } from '@/api/auth';

// Initialisez Stripe avec votre clé secrète
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

// Fonction spécifique à appeler après un paiement réussi
async function handleSuccessfulPayment(session) {
    // Récupérer les informations pertinentes
    const paymentIntentId = session.payment_intent;
    const customerEmail = session.customer_details.email;
    const clientReferenceId = session.client_reference_id;
    const amountTotalInCents = session.amount_total;
    const amountTotalInEuros = (amountTotalInCents / 100).toFixed(2); // Convertir les centimes en euros et formater
    const productCode = session.metadata.code; // Récupérer la métadonnée 'code'
    const timestamp = new Date(session.created * 1000); // Convertir les secondes UNIX en date

    // Afficher les informations dans la console
    console.log('Handling successful payment for session:');
    console.log('Session ID:', session.id);
    console.log('Customer Email:', customerEmail);
    console.log('Client Reference ID:', clientReferenceId);
    console.log('Amount Total Paid (in euros): €', amountTotalInEuros);
    console.log('Product Code:', productCode);
    console.log('Payment Date and Time:', timestamp.toISOString());

    await addProduct(clientReferenceId, customerEmail, session.id, amountTotalInEuros, timestamp, productCode, true);

    // Exemple : Mettre à jour la base de données ou envoyer un e-mail
    // await updateDatabaseWithSessionData(session);
    // await sendConfirmationEmail(customerEmail);
}

export async function POST(req) {
    const sig = req.headers.get('stripe-signature');
    const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        const body = await req.text();
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            // Appeler la fonction spécifique pour gérer le paiement réussi
            await handleSuccessfulPayment(session);
            break;

        // Gérez d'autres événements ici
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
