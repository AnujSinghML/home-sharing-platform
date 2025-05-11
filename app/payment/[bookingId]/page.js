'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export default function PaymentPage({ params }) {
  const router = useRouter();
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmPayment = async () => {
    if (!isPaymentConfirmed) {
      toast.error('Please confirm that you have made the payment');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/bookings/${params.bookingId}/confirm-payment`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to confirm payment');
      }

      toast.success('Payment confirmed! Your booking is now confirmed.');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Scan the QR code below to make your payment</p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {/* QR Code */}
          <div className="w-64 h-64 bg-white p-4 rounded-lg border-2 border-gray-200 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <Image
                src="/images/payment-qr.jpg"
                alt="Payment QR Code"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="text-center space-y-2 w-full">
            <p className="text-gray-700 font-medium">Payment Instructions:</p>
            <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
              <li>Open your mobile payment app</li>
              <li>Scan the QR code above</li>
              <li>Enter the amount shown in your booking</li>
              <li>Complete the payment</li>
            </ol>
          </div>

          {/* Payment Confirmation Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="payment-confirmation"
              checked={isPaymentConfirmed}
              onChange={(e) => setIsPaymentConfirmed(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="payment-confirmation" className="text-sm text-gray-700">
              I confirm that I have completed the payment
            </label>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmPayment}
            disabled={!isPaymentConfirmed || isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Confirming...' : 'Confirm Payment'}
          </button>

          {/* Cancel Link */}
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel and go back
          </button>
        </div>
      </div>
    </div>
  );
} 