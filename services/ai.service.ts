import apiClient from './api';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}

const USE_MOCKS = true;

const COACH_KNOWLEDGE_BASE: Record<string, string> = {
  allowance:
    "Your current daily allowance is ₹1,000/day. It is calculated by dividing your remaining flexible budget (₹16,000) by the 16 days left until your next salary on 1st November. If you spend less than ₹1,000 today, tomorrow's safe allowance increases automatically!",
  decrease:
    'Your daily allowance decreased because you had an extra expense of ₹850 at Nature Basket supermarket and ₹420 on Swiggy dinner yesterday. Don’t worry — if you keep today’s spend under ₹750, your buffer will recover in 2 days.',
  spending:
    'So far in this salary cycle, your highest flexible spend is in Groceries & Daily Needs (₹3,200, 40%) followed closely by Food & Dining (₹2,400, 30%). Your fixed commitments (Rent: ₹10,000, EMI: ₹6,000) are already accounted for in your survival safety buffer.',
  save:
    'Yes! You have already planned ₹3,000 for savings this month. With ₹16,000 flexible budget remaining across 16 days, if you limit daily spending to ₹850/day instead of ₹1,000/day, you will save an additional ₹2,400 surplus before salary day.',
  payments:
    'Your upcoming commitments before next payday:\n1. 01 Nov: 2BHK House Rent (₹10,000)\n2. 05 Nov: Bike Loan EMI (₹6,000)\n3. 10 Nov: BESCOM Electricity & Broadband (₹2,000)\n\nThese are already reserved in your monthly budget.',
  today:
    'Based on your Salary Survival Engine, you can safely spend ₹1,000 today on guilt-free flexible expenses (food, travel, coffee, snacks) without endangering your rent, EMIs or savings goals!',
};

export const aiCoachService = {
  async askCoach(question: string): Promise<ChatMessage> {
    if (USE_MOCKS) {
      await new Promise(r => setTimeout(r, 600)); // Natural AI thinking delay

      const q = question.toLowerCase();
      let reply =
        "I'm keeping a close eye on your salary burn rate. Based on your current income of ₹45,000 and fixed commitments of ₹18,000, your safe daily allowance is ₹1,000/day. Feel free to ask about your upcoming bills, saving targets, or category breakdowns!";

      if (q.includes('why') && (q.includes('allowance') || q.includes('decrease') || q.includes('drop'))) {
        reply = COACH_KNOWLEDGE_BASE.decrease;
      } else if (q.includes('how much') || (q.includes('spend') && q.includes('today'))) {
        reply = COACH_KNOWLEDGE_BASE.today;
      } else if (q.includes('where') || q.includes('most') || q.includes('category')) {
        reply = COACH_KNOWLEDGE_BASE.spending;
      } else if (q.includes('save') || q.includes('2000') || q.includes('2,000')) {
        reply = COACH_KNOWLEDGE_BASE.save;
      } else if (q.includes('payment') || q.includes('next') || q.includes('due') || q.includes('bills')) {
        reply = COACH_KNOWLEDGE_BASE.payments;
      } else if (q.includes('allowance')) {
        reply = COACH_KNOWLEDGE_BASE.allowance;
      }

      return {
        id: `msg-${Date.now()}`,
        sender: 'coach',
        text: reply,
        timestamp: new Date().toISOString(),
      };
    }

    const response = await apiClient.post<ChatMessage>('/ai-coach/chat', { prompt: question });
    return response.data;
  },
};

