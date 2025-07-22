export type Database = {
  public: {
    Tables: {
      BlogPost: {
        Row: {
          id: string
          title: string
          summary: string
          content: string
          cover_image: string
          publishedAt: string
          author: string
        }
        Insert: { /* … */ }
        Update: { /* … */ }
      }
    }
  }
}
