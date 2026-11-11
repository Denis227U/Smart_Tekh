import s from './pickup-selector.module.scss';

export const PickupAddressLabel = ({
  address,
  workingDays,
  workingHours,
}: {
  address: string;
  workingDays: string;
  workingHours: string;
}) => {
  return (
    <div className={s.labelContainer}>
      <span className={s.addressText}>{address}</span>
      <span className={s.workingHoursText}>
        {workingDays}, {workingHours}
      </span>
    </div>
  );
};
