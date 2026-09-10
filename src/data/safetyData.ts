import { SafetyInfo } from '../types';

export const SAFETY_DATABASE: Record<string, SafetyInfo> = {
  'default': {
    destinationId: 'national-india',
    destinationName: 'India National Travel Safety',
    emergencyContacts: [
      { label: 'All-in-One National Emergency', number: '112', notes: 'Police, Fire & Ambulance response' },
      { label: 'National Tourist Helpline', number: '1363', notes: 'Toll-free 24/7 multilingual support' },
      { label: 'Women Safety Helpline', number: '1091', notes: 'Immediate police intervention & support' },
      { label: 'Medical Ambulance', number: '108', notes: 'Emergency response service' }
    ],
    nearestHospitals: [
      { name: 'District General Hospital', distance: '3.2 km', contact: '108' },
      { name: 'Apollo Emergency Clinic', distance: '5.8 km', contact: '+91 40 4344 1066' }
    ],
    alerts: [
      'Carry digital & printed copies of identification documents at all times.',
      'Check local weather advisories before starting high-altitude or coastal expeditions.'
    ],
    localTips: [
      'Drink bottled or certified filtered RO water.',
      'Always use metered cabs or authorized ride apps, or pre-book through verified operators.',
      'Keep emergency offline contacts and a battery power bank handy.'
    ],
    documentChecklist: ['Government ID (Aadhar / Passport)', 'Travel Insurance Policy', 'Emergency Contact Card', 'Doctor Prescription (if carrying medication)']
  }
};
