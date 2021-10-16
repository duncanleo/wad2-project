declare namespace App.Frontend {
  namespace Models {
    type Me = App.API.CurrentUser;
  }

  namespace Store {
    interface RootState {
      user: Models.Me | null;
    }
  }
}
