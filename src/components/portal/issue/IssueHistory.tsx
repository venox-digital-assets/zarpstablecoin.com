import { mockTransactions } from '../../../data/portal-mock';
import RecentActivity from '../dashboard/RecentActivity';

export default function IssueHistory() {
  const issueTransactions = mockTransactions.filter((tx) => tx.type === 'issue');
  return <RecentActivity transactions={issueTransactions} />;
}
