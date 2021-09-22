declare namespace Foursquare.API {
  interface Response<TResults> {
    meta: {
      code: number;
      requestId: string;
      errorType?: string;
      errorDetail?: string;
    };
    response: TResults;
  }

  interface VenueExploreResults {
    suggestedRadius: number;
    headerLocation: string;
    headerFullLocation: string;
    headerLocationGranularity: string;
    totalResults: number;
    groups: Group[];
  }

  interface Group {
    type: string;
    name: string;
    items: GroupItem[];
  }

  interface GroupItem {
    reasons: {
      count: number;
      items: {
        summary: string;
        type: string;
        reasonName: string;
      }[];
    };
    venue: Venue;
    referralId: string;
  }

  interface Location {
    address?: string;
    lat: number;
    lng: number;
    distance: number;
    postalCode?: string;
    cc: string;
    city?: string;
    country: string;
    formattedAddress: string[];
    neighborhood?: string;
    crossStreet?: string;
  }

  interface Category {
    id: string;
    name: string;
    pluralName: string;
    shortName: string;
    icon: {
      prefix: string;
      suffix: string;
    };
    primary: boolean;
  }

  interface Venue {
    id: string;
    name: string;
    location: Location;
    categories: Category[];
  }
}
