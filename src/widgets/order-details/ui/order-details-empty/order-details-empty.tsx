import s from './order-details-empty.module.scss';

export const OrderDetailsEmpty = ({ emptyMsg }: { emptyMsg: string }) => {
  return <div className={s.emptyState}>{emptyMsg}</div>;
};
