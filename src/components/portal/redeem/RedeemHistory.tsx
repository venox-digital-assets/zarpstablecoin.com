import { mockTransactions } from '../../../data/portal-mock';
import RecentActivity from '../dashboard/RecentActivity';

export default function RedeemHistory() {
  const redeemTransactions = mockTransactions.filter((tx) => tx.type === 'redeem');
  return <RecentActivity transactions={redeemTransactions} />;
}
