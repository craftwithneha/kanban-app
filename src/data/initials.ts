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
        
        },
        {
          id: "2",
          title: "Responsive Website Design for 23 clients",
          description: "Use Tailwind CSS and Flexbox Grids",
          date: "27 Jun 2025",
          
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
         
        },
        {
          id: "5",
          title: "Write a few articles for slothUI",
          description: "Publish 3 UI blogs with illustrations",
          date: "24 Jun 2025",
          
        }
      ]
    }
  }
};


export const getInitialColumns = () => initialData.columns;
