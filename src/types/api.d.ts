declare namespace App.API {
  interface ResponseBase {
    status: boolean;
  }

  interface Team {
    id: number;
    name: string;
    avatar: string | null;
    memberships_count: number;
    created_at: string;
  }
}
