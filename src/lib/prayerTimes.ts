interface PrayerTimesResponse {
  success: boolean;
  results: {
    datetime: Array<{
      times: {
        Fajr: string;
        Sunrise: string;
        Dhuhr: string;
        Asr: string;
        Sunset: string;
        Maghrib: string;
        Isha: string;
        Imsak: string;
        Midnight: string;
      };
      date: {
        readable: string;
        timestamp: string;
      };
    }>;
    location: {
      latitude: number;
      longitude: number;
      elevation: number;
      city: string;
      country: string;
      country_code: string;
      timezone: string;
    };
    settings: {
      timeformat: string;
      school: string;
      juristic: string;
      highlat: string;
      fajr_angle: string;
      isha_angle: string;
    };
  };
}

interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
    };
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
        };
        month: {
          number: number;
          en: string;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: {
          Fajr: number;
          Isha: number;
        };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: {
        Imsak: number;
        Fajr: number;
        Sunrise: number;
        Dhuhr: number;
        Asr: number;
        Maghrib: number;
        Sunset: number;
        Isha: number;
        Midnight: number;
      };
    };
  };
}

interface PrayerTime {
  name: string;
  time: string;
  passed: boolean;
  current: boolean;
}

export const fetchPrayerTimes = async (
  latitude: number,
  longitude: number,
  method: number = 3 // Default to MWL (Muslim World League)
): Promise<PrayerTime[]> => {
  try {
    const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`;
    console.log('Fetching prayer times from Aladhan API:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AladhanResponse = await response.json();
    console.log('Aladhan API Response:', data);

    if (data.code !== 200 || !data.data?.timings) {
      console.error('Invalid API response structure:', data);
      throw new Error('Invalid response from Aladhan API');
    }

    const timings = data.data.timings;
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayerTimes: PrayerTime[] = [
      { name: 'Fajr', time: formatTime(timings.Fajr), passed: false, current: false },
      { name: 'Dhuhr', time: formatTime(timings.Dhuhr), passed: false, current: false },
      { name: 'Asr', time: formatTime(timings.Asr), passed: false, current: false },
      { name: 'Maghrib', time: formatTime(timings.Maghrib), passed: false, current: false },
      { name: 'Isha', time: formatTime(timings.Isha), passed: false, current: false }
    ];

    // Determine which prayers have passed and which is current
    let nextPrayerIndex = -1;
    for (let i = 0; i < prayerTimes.length; i++) {
      const prayerTime = parseTime(prayerTimes[i].time);
      if (currentTime < prayerTime) {
        nextPrayerIndex = i;
        break;
      }
      prayerTimes[i].passed = true;
    }

    // Mark current prayer (next upcoming prayer)
    if (nextPrayerIndex >= 0) {
      prayerTimes[nextPrayerIndex].current = true;
    } else {
      // If all prayers have passed, mark Fajr of next day as current
      prayerTimes[0].current = true;
      prayerTimes[0].passed = false;
    }

    console.log('Processed prayer times:', prayerTimes);
    return prayerTimes;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
    // Return default prayer times if API fails
    return getDefaultPrayerTimes();
  }
};

const formatTime = (time: string): string => {
  // Aladhan API returns time in HH:MM format (24-hour)
  // Convert to 12-hour format
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const parseTime = (timeStr: string): number => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let totalMinutes = (hours % 12) * 60 + minutes;
  if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
  if (period === 'AM' && hours === 12) totalMinutes = minutes;
  return totalMinutes;
};

const getDefaultPrayerTimes = (): PrayerTime[] => {
  return [
    { name: "Fajr", time: "5:30 AM", passed: true, current: false },
    { name: "Dhuhr", time: "12:45 PM", passed: true, current: false },
    { name: "Asr", time: "3:30 PM", passed: false, current: true },
    { name: "Maghrib", time: "6:15 PM", passed: false, current: false },
    { name: "Isha", time: "7:45 PM", passed: false, current: false },
  ];
};

export const getUserTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// Available calculation methods for Aladhan API
export const CALCULATION_METHODS = {
  JAFARI: 0, // Ithna Ashari
  KARACHI: 1, // University of Islamic Sciences, Karachi
  ISNA: 2, // Islamic Society of North America
  MWL: 3, // Muslim World League (Default)
  MECCA: 4, // Umm Al-Qura University, Mecca
  EGYPTIAN: 5, // Egyptian General Authority of Survey
  CUSTOM: 99, // Custom setting
  TEHRAN: 7, // Institute of Geophysics, University of Tehran
  GULF: 8, // Gulf Region
  KUWAIT: 9, // Kuwait
  QATAR: 10, // Qatar
  SINGAPORE: 11, // Majlis Ugama Islam Singapura, Singapore
  FRANCE: 12, // Union Organization islamic de France
  TURKEY: 13, // Diyanet İşleri Başkanlığı, Turkey
  RUSSIA: 14, // Spiritual Administration of Muslims of Russia
};