import s from './pickup-selector.module.scss';

export const PickupAddressLabel = ({
  id,
  address,
  workingDays,
  workingHours,
}: {
  id: string;
  address: string;
  workingDays: string;
  workingHours: string;
}) => {
  return (
    <div
      data-point-id={id}
      className={s.labelContainer}
    >
      <span className={s.addressText}>{address}</span>
      <span className={s.workingHoursText}>
        {workingDays}, {workingHours}
      </span>
    </div>
  );
};
