-- Add Vobiz as a new telephony provider option.
-- PostgreSQL requires ALTER TYPE to add a value to an existing enum.
-- The new value is appended after the existing TELNYX value.
ALTER TYPE "TelephonyProvider" ADD VALUE IF NOT EXISTS 'vobiz';
