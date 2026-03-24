export interface Dictionary {
  nav: {
    home: string;
    blog: string;
    projects: string;
    snippets: string;
    bookmarks: string;
    contact: string;
  };
  common: {
    activeFilters: string;
    clearFilters: string;
    categories: string;
    tags: string;
    all: string;
    technologies: string;
    stats: string;
    categoryLabel: string;
    tagLabel: string;
    technologyLabel: string;
  };
  breadcrumb: {
    home: string;
  };
  home: {
    tagline: string;
    p1: string;
    p1Nomad: string;
    p2: string;
    p2Decades: string;
    p3: string;
    p4: string;
    p5: string;
    exploreProjects: string;
    sendMessage: string;
  };
  posts: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    noPostsFound: string;
    noPostsFor: string;
    seeAllPosts: string;
  };
  snippets: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    noSnippetsFound: string;
    seeAllSnippets: string;
    backToSnippets: string;
    totalSnippets: string;
  };
  projects: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    featured: string;
    noProjectsFound: string;
    noProjectsFor: string;
    seeAllProjects: string;
    totalProjects: string;
  };
  bookmarks: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    noBookmarksFound: string;
    noBookmarksFor: string;
    seeAllBookmarks: string;
    totalBookmarks: string;
  };
  contact: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    description: string;
    formTitle: string;
    formDesc: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    submitButton: string;
    sendingButton: string;
  };
}
