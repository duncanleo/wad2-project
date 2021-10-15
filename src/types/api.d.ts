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

  interface Tournament {
    id: number;
    name: string;
    region: string;
    prize_pool: number;
    start_at: string;
    end_at: string;
    game_id: number;
    owner: User;
  }

  interface User {
    id: number;
    display_name: string;
    bio: string;
    gameAccounts: GameAccount[];
  }

  interface CurrentUser extends User {
    memberships: Membership[];
  }

  interface Membership {
    id: number;
    team_id: number;
    role: 'leader' | 'member';
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

  interface TeamInvitation {
    id: number;
    message: string | null;
    user: User;
  }

  interface TeamJoinRequest {
    id: number;
    message: string | null;
    status: 'idle' | 'approved' | 'rejected';
  }
}
