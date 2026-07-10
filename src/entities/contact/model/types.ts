export interface PhoneNumber {
  label: string;
  value: string;
}

export interface Contact {
  phoneNumbers: PhoneNumber[];
  workingHours: string;
  addresses: string[];
}
