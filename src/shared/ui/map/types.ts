export interface MapViewProps {
  center: [number, number]; // [lng, lat]
  zoom?: number;
  className?: string;
}

export interface MapMarkerProps {
  coordinates: [number, number]; // [lng, lat]
  isActive?: boolean;
  tooltip?: React.ReactNode;
  onClick?: () => void;
}
