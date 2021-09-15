declare namespace App.Frontend {
  namespace Models {
    interface Me {
      email: string;
      display_name: string;
    }
  }

  namespace Store {
    interface RootState {
      user: Models.Me | null;
    }
  }
}
