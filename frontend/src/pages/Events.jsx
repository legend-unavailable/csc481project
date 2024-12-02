export default Events = () => {
    return ([
      {
        name: "party",
        type: "in person",
        location: "house",
        date: "Dec 12, 2024",
        duration: "whole day",
        atendees: [{ name: "julian", email: "julian@email.com" }],
      },
      {
        name: "meeting",
        type: "online",
        location: "zoom",
        date: "Dec 20, 2024",
        duration: "one hour",
        atendees: [
            { name: "jesus", email: "jesus@email.com" },
            { name: "liz", email: "liz@email.com" },
        ],
      },
    ])
}