declare namespace App.API {
  interface ResponseBase {
    status: boolean;
  }

  interface Game {
    id: number;
    name: string;
    developer: string;
    release_year: number;
  }

  interface GameAccount {
    id: number;
    game: Game;
  }

  interface User {
    id: number;
    display_name: string;
    bio: string;
    gameAccounts: GameAccount[];
  }

  interface Membership {
    id: number;
    user: User;
  }

  interface Team {
    id: number;
    name: string;
    avatar: string | null;
    description: string | null;
    memberships_count: number;
    created_at: string;
    memberships?: Membership[];
  }
}
