/*
  # Create completed numbers table

  1. New Tables
    - `completed_numbers`
      - `id` (uuid, primary key)
      - `number` (integer, unique)
      - `needs_review` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `completed_numbers` table
    - Add policies for public access (since this is a simple app without authentication)
*/

CREATE TABLE IF NOT EXISTS completed_numbers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number integer UNIQUE NOT NULL,
  needs_review boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE completed_numbers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public access for completed_numbers"
  ON completed_numbers
  FOR ALL
  USING (true)
  WITH CHECK (true);