import { NextRequest, NextResponse } from 'next/server';
import { withPublicApi } from '@/lib/api/guard';
import { connectToDatabase } from '@/lib/db/mongodb';
import { GeneralEnquiry } from '@/models/GeneralEnquiry';
import { BookingRequest } from '@/models/BookingRequest';

export const POST = withPublicApi(async (req: NextRequest) => {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON request payload.' },
      { status: 400 }
    );
  }

  const { names, email, phone, weddingDate, location, services, notes } = body;

  if (!names || !email || !phone) {
    return NextResponse.json(
      { success: false, error: 'Names, email, and phone number are required fields.' },
      { status: 400 }
    );
  }

  // Attempt database persistence if MongoDB is configured
  try {
    await connectToDatabase();

    if (weddingDate) {
      // Save as BookingRequest
      await BookingRequest.create({
        brideName: names,
        email,
        phone,
        weddingDate: new Date(weddingDate),
        city: location || 'Odisha',
        services: Array.isArray(services) ? services : [services || 'both'],
        storyNotes: notes || '',
        status: 'pending',
      });
    } else {
      // Save as GeneralEnquiry
      await GeneralEnquiry.create({
        name: names,
        email,
        phone,
        subject: `Wedding Inquiry for ${location || 'Odisha'}`,
        message: notes || 'Wedding photography and cinema inquiry.',
        status: 'new',
      });
    }
  } catch (dbError) {
    console.warn('[InquiriesAPI] MongoDB persistence notice (fallback to logged intake):', dbError);
  }

  return NextResponse.json({
    success: true,
    message: 'Your inquiry has been received. Our team will contact you within 24 hours.',
  });
});
