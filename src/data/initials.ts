export const initialData = {
  columns: {
    todo: {
      title: "To Do",
      items: [
        {
          id: "1",
          title: "UI/UX Design in the age of AI",
          description: "Design a next-gen AI-based UX layout",
          date: "28 Jun 2025",
          tag: "Important",
          avatars: ["/avatars/avatar.png"],
          linkedin: "https://linkedin.com/in/designer1",
          comments: 11
        },
        {
          id: "2",
          title: "Responsive Website Design for 23 clients",
          description: "Use Tailwind CSS and Flexbox Grids",
          date: "27 Jun 2025",
          tag: "Processing",
          avatars: ["/avatars/myProfile.jpg", "/avatars/user4.png", "/avatars/user5.png"],
          linkedin: "https://linkedin.com/in/designer2",
          comments: 32
        }
      ]
    },

    inprogress: {
      title: "In Progress",
      items: [
        {
          id: "3",
          title: "Machine Learning Progress",
          description: "Train and validate AI recommendation model",
          date: "26 Jun 2025",
          tag: "Important",
          avatars: ["/avatars/avatar2.png"],
          linkedin: "https://linkedin.com/in/mlengineer",
          comments: 11
        }
      ]
    },

    done: {
      title: "Completed",
      items: [
        {
          id: "4",
          title: "User flow confirmation for fintech App",
          description: "Final testing with internal team",
          date: "25 Jun 2025",
          tag: "Important",
          avatars: ["/avatars/myProfile.jpg"],
          linkedin: "https://linkedin.com/in/productmanager",
          comments: 11
        },
        {
          id: "5",
          title: "Write a few articles for slothUI",
          description: "Publish 3 UI blogs with illustrations",
          date: "24 Jun 2025",
          tag: "OK",
          avatars: ["/avatars/avatar.png"],
          linkedin: "https://linkedin.com/in/blogwriter",
          comments: 987
        }
      ]
    }
  }
};


export const getInitialColumns = () => initialData.columns;
