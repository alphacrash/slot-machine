import { CompletedNumber } from '../types';
import { supabase } from './supabase';

export const getCompletedNumbers = async (): Promise<CompletedNumber[]> => {
  const { data, error } = await supabase
    .from('completed_numbers')
    .select('*')
    .order('number');

  if (error) {
    console.error('Error fetching completed numbers:', error);
    return [];
  }

  return data || [];
};

export const saveCompletedNumber = async (number: number): Promise<void> => {
  const { error } = await supabase
    .from('completed_numbers')
    .insert([{ number, needs_review: false }]);

  if (error) {
    console.error('Error saving completed number:', error);
  }
};

export const removeCompletedNumber = async (number: number): Promise<void> => {
  const { error } = await supabase
    .from('completed_numbers')
    .delete()
    .eq('number', number);

  if (error) {
    console.error('Error removing completed number:', error);
  }
};

export const toggleReviewStatus = async (number: number): Promise<void> => {
  const { data: existing, error: fetchError } = await supabase
    .from('completed_numbers')
    .select('needs_review')
    .eq('number', number)
    .single();

  if (fetchError) {
    console.error('Error fetching review status:', fetchError);
    return;
  }

  const { error: updateError } = await supabase
    .from('completed_numbers')
    .update({ needs_review: !existing.needs_review })
    .eq('number', number);

  if (updateError) {
    console.error('Error updating review status:', updateError);
  }
};

export const isAllCompleted = async (): Promise<boolean> => {
  const { count, error } = await supabase
    .from('completed_numbers')
    .select('*', { count: 'exact' });

  if (error) {
    console.error('Error checking completion status:', error);
    return false;
  }

  return (count || 0) === 169;
};