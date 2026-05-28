/*
  # Create paid tests table

  1. New Tables
    - `paid_tests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `test_type` (text, test name: 'lucent' or 'ghatnachakra')
      - `purchased_at` (timestamp)
      - `valid_until` (timestamp, 365 days from purchase)

  2. Security
    - Enable RLS on `paid_tests` table
    - Add policy for users to read their own purchases
    - Add policy for users to insert their own purchases
*/

CREATE TABLE IF NOT EXISTS paid_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_type text NOT NULL CHECK (test_type IN ('lucent', 'ghatnachakra')),
  purchased_at timestamptz DEFAULT now(),
  valid_until timestamptz DEFAULT now() + interval '365 days',
  UNIQUE(user_id, test_type)
);

ALTER TABLE paid_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own paid tests"
  ON paid_tests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own paid tests"
  ON paid_tests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
