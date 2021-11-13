declare namespace App.API {
  interface ResponseBase {
    status: boolean;
  }

  interface Game {
    id: number;
    name: string;
    developer: string;
    release_year: number;
    internal_id: string;
    banner_image: string;
    banner_image_license: string;
    logo_image: string;
    logo_image_license: string;
    background_image: string;
    background_image_license: string;
  }

  interface GameAccount {
    id: number;
    data: object;
    game: Game;
    updated_at: string;
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
    game: Game;
  }

  interface User {
    id: number;
    display_name: string;
    bio: string;
    gameAccounts: GameAccount[];
    memberships: Membership[];
  }

  interface CurrentUser extends User {
    memberships: Membership[];
    type: 'gamer' | 'organiser';
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
    is_member?: boolean;
    join_request_status?: 'idle' | 'approved' | 'rejected' | null;
    participations: TournamentParticipation[];
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

  interface TournamentParticipation {
    id: number;
    tournament: Tournament;
  }
}
