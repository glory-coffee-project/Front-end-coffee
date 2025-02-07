import DeleteButton from '@/components/common/DeleteButton';
import EditButton from '@/components/common//EditButton';
import { Transaction } from '@/api/storeId/ledger/transactions/transactions.type';

type TransactionItemProps = {
  transaction: Transaction;
  isEditMode: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
};

const TransactionItem = ({
  transaction,
  isEditMode,
  onEdit,
  onDelete,
}: TransactionItemProps) => (
  <ul className='relative flex h-[45px] w-full items-center border-b border-underline/30 text-center'>
    <li className='w-[30%] text-lg font-normal'>{transaction.category}</li>

    <li className='w-[40%] text-lg font-normal'>{transaction.detail}</li>

    <li
      className={`w-[30%] text-lg font-normal ${
        transaction.type === 'expense' ? 'text-red' : 'text-green'
      }`}
    >
      {transaction.type === 'expense' ? '- ' : '+ '}
      {transaction.cost.toLocaleString()}원
    </li>

    {isEditMode && (
      <li className='absolute inset-0 flex items-center justify-center gap-4 bg-white/50'>
        <EditButton onClick={() => onEdit(transaction)} />
        <DeleteButton onClick={() => onDelete(transaction)} />
      </li>
    )}
  </ul>
);

export default TransactionItem;
