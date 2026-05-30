/*
  # Create Questions Table

  1. New Tables
    - `questions`
      - `id` (uuid, primary key)
      - `category` (text) - 'paid_test' or 'free_test'
      - `subject` (text) - 'History', 'Geography', 'Lucent', 'Ghatnachakra', 'Reasoning', 'English', 'Mathematics', 'Science', 'General Knowledge'
      - `question` (text)
      - `option_a` (text)
      - `option_b` (text)
      - `option_c` (text)
      - `option_d` (text)
      - `correct_answer` (text) - 'A', 'B', 'C', or 'D'
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `questions` table
    - Add policy for authenticated users to read questions
    - Add policy for service role to manage questions

  3. Notes
    - Category determines if question is free or paid
    - Subject allows filtering by specific subject
    - All authenticated users can read questions
    - Only admin/service can insert/update/delete
*/

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('paid_test', 'free_test')),
  subject text NOT NULL,
  question text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_answer text NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read questions
CREATE POLICY "Authenticated users can read questions"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Service role can manage all questions
CREATE POLICY "Service role can manage questions"
  ON questions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject);
CREATE INDEX IF NOT EXISTS idx_questions_category_subject ON questions(category, subject);
