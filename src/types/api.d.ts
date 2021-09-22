declare namespace App.API {
  interface Result<TData> {
    status: boolean;
    data: TData;
  }

  interface NearbyResult {
    headerLocation: string;
    headerLocationGranularity: string;
    headerFullLocation: string;
    items: Foursquare.API.GroupItem[];
  }
}
