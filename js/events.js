const eventsData = [
    // Sports - Boys
    {
        id: 'cricket',
        name: 'Cricket (Boys)',
        category: 'sports',
        subCategory: 'boys',
        teamSize: '11 Members',
        price: '₹500',
        description: "The ultimate gentleman's game. Box cricket format with knockout rounds.",
        iconClass: 'fas fa-baseball-ball',
        image: 'images/cricket.jpg',
        registrationLink: '#',
        buttonText: 'Register Team',
        aosDelay: 0
    },
    {
        id: 'kabaddi_boys',
        name: 'Kabaddi (Boys)',
        category: 'sports',
        subCategory: 'boys',
        teamSize: '7 Members',
        price: '₹350',
        description: "Test your strength and breath. Raid the opponent's territory and return safely.",
        iconClass: 'fas fa-running',
        image: 'images/kabaddi.jpg',
        registrationLink: '#',
        buttonText: 'Register Team',
        aosDelay: 100
    },
    {
        id: 'volleyball',
        name: 'Volleyball (Boys)',
        category: 'sports',
        subCategory: 'boys',
        teamSize: '6 Members',
        price: '₹300',
        description: 'Spike, block, and serve your way to victory in this high-energy team sport.',
        iconClass: 'fas fa-volleyball-ball',
        image: 'images/volleyball.jpg',
        registrationLink: '#',
        buttonText: 'Register Team',
        aosDelay: 200
    },
    {
        id: 'khokho_boys',
        name: 'Kho-Kho (Boys)',
        category: 'sports',
        subCategory: 'boys',
        teamSize: '9 Members',
        price: '₹300',
        description: 'A game of chase and tag. Speed and agility are your best weapons here.',
        iconClass: 'fas fa-users',
        image: 'images/khokho.jpg',
        registrationLink: '#',
        buttonText: 'Register Team',
        aosDelay: 0
    },

    // Sports - Girls
    {
        id: 'khokho_girls',
        name: 'Kho-Kho (Girls)',
        category: 'sports',
        subCategory: 'girls',
        teamSize: '9 Members',
        price: '₹300',
        description: 'A game of chase and tag. Speed and agility are your best weapons here.',
        iconClass: 'fas fa-users',
        image: 'images/khokho_girls.jpg', // Placeholder
        registrationLink: '#',
        buttonText: 'Register Team',
        aosDelay: 100
    },
    {
        id: 'kabaddi_girls',
        name: 'Kabaddi (Girls)',
        category: 'sports',
        subCategory: 'girls',
        teamSize: '7 Members',
        price: '₹350',
        description: "Test your strength and breath. Raid the opponent's territory and return safely.",
        iconClass: 'fas fa-running',
        image: 'images/kabaddi_girls.jpg', // Placeholder
        registrationLink: '#',
        buttonText: 'Register Team',
        aosDelay: 200
    },
    {
        id: 'throwball',
        name: 'Throw Ball (Girls)',
        category: 'sports',
        subCategory: 'girls',
        teamSize: '7 Members',
        price: '₹300',
        description: 'Catch, throw, and win. Accuracy and teamwork are essential.',
        iconClass: 'fas fa-baseball-ball', // Closest match
        image: 'images/throwball.jpg', // Placeholder
        registrationLink: '#',
        buttonText: 'Register Team',
        aosDelay: 0
    },
    {
        id: 'tugofwar',
        name: 'Tug of War (Girls)',
        category: 'sports',
        subCategory: 'girls',
        teamSize: '8 Members',
        price: '₹400',
        description: 'Pure test of strength and coordination. Pull the rope to your side!',
        iconClass: 'fas fa-users',
        image: 'images/tugofwar.jpg',
        registrationLink: '#',
        buttonText: 'Register Team',
        aosDelay: 100
    },

    // Sports - Open Events
    {
        id: 'relay',
        name: 'Relay Race (Open)',
        category: 'sports',
        subCategory: 'open',
        teamSize: '4 Members',
        price: '₹200',
        description: '4x100m relay. Pass the baton smoothly and sprint to the finish line.',
        iconClass: 'fas fa-running',
        image: 'images/relay.jpg',
        registrationLink: '#',
        buttonText: 'Register Team',
        aosDelay: 200
    },
    {
        id: 'chess',
        name: 'Chess (Open)',
        category: 'sports',
        subCategory: 'open',
        teamSize: '1 vs 1',
        price: '₹100',
        description: 'Battle of minds. Checkmate your opponent in this classic strategy game.',
        iconClass: 'fas fa-chess',
        image: 'images/chess.jpg',
        registrationLink: '#',
        buttonText: 'Register Now',
        aosDelay: 0
    },
    {
        id: 'carrom',
        name: 'Carrom (Open)',
        category: 'sports',
        subCategory: 'open',
        teamSize: '2 Members (Doubles)',
        price: '₹150',
        description: 'Strike and pocket. Precision is key in this board game.',
        iconClass: 'fas fa-bullseye', // Closest match
        image: 'images/carrom.jpg',
        registrationLink: '#',
        buttonText: 'Register Team',
        aosDelay: 100
    },
    {
        id: 'tabletennis',
        name: 'Table Tennis (Open)',
        category: 'sports',
        subCategory: 'open',
        teamSize: '1 vs 1',
        price: '₹100',
        description: 'Fast-paced ping pong action. Reflexes and spin are everything.',
        iconClass: 'fas fa-table-tennis',
        image: 'images/tabletennis.jpg',
        registrationLink: '#',
        buttonText: 'Register Now',
        aosDelay: 200
    },

    // Technical
    // CSE, AI & DS
    {
        id: 'reversecoding',
        name: 'Reverse Coding',
        category: 'technical',
        teamSize: '3 Members',
        price: '₹150',
        description: 'Decode the logic from the given executable or output and write the source code to replicate it.',
        iconClass: 'fas fa-code',
        image: 'images/reverse.jpg',
        registrationLink: 'https://forms.gle/7XhSrLXVUxFvmT169',
        buttonText: 'Register Now',
        aosDelay: 0
    },
    {
        id: 'errordebugging',
        name: 'Error Debugging',
        category: 'technical',
        teamSize: '3 Members',
        price: '₹150',
        description: 'Find and fix bugs in code snippets within a limited time. Accuracy and speed are key.',
        iconClass: 'fas fa-bug',
        image: 'images/debug.jpg',
        registrationLink: 'https://forms.gle/LaHZbnaMiTHGS8jr9',
        buttonText: 'Register Now',
        aosDelay: 100
    },
    {
        id: 'codetreasurehunt',
        name: 'Code Treasure Hunt',
        category: 'technical',
        teamSize: '4 Members',
        price: '₹100',
        description: 'Solve technical puzzles to get clues for the next level. A mix of coding and scavenger hunt.',
        iconClass: 'fas fa-search',
        image: 'images/treasure.jpg',
        registrationLink: 'https://forms.gle/qcRateRRbTxVnwTe8',
        buttonText: 'Register Now',
        aosDelay: 200
    },

    // ECE
    {
        id: 'circuitdebugging',
        name: 'Circuit Design & Debugging',
        category: 'technical',
        teamSize: '2 Members',
        price: '₹50',
        description: 'Design and debug complex electronic circuits. Test your knowledge of electronics.',
        iconClass: 'fas fa-microchip',
        image: 'images/circuit.jpg',
        registrationLink: 'https://forms.gle/gKWLi6GwaV5zopvd9',
        buttonText: 'Register Now',
        aosDelay: 0
    },

    // Mechanical
    {
        id: '3dprinting',
        name: '3D Printing',
        category: 'technical',
        teamSize: '2 Members',
        price: '₹60',
        description: 'Bring ideas to life. Design and print 3D models based on specific problem statements.',
        iconClass: 'fas fa-cube',
        image: 'images/3d.jpg',
        registrationLink: 'https://forms.gle/UjJMoFtPCjVpNiey6',
        buttonText: 'Register Now',
        aosDelay: 100
    },

    // Civil
    {
        id: 'trustintruss',
        name: 'Trust in Truss',
        category: 'technical',
        teamSize: '3 Members',
        price: '₹60',
        description: 'Design and build the most stable truss structure using provided materials.',
        iconClass: 'fas fa-drafting-compass',
        image: 'images/truss.jpg', // Placeholder
        registrationLink: '#',
        buttonText: 'Register Now',
        aosDelay: 200
    },
    {
        id: 'smartcity',
        name: 'Smart City Drawing',
        category: 'technical',
        teamSize: '1 Member',
        price: '₹30',
        description: 'Develop technical drawings for smart cities. Drawing sheets will be provided.',
        iconClass: 'fas fa-city',
        image: 'images/smartcity.jpg', // Placeholder
        registrationLink: '#',
        buttonText: 'Register Now',
        aosDelay: 0
    },

    // EEE
    {
        id: 'powerjam',
        name: 'Power Jam',
        category: 'technical',
        teamSize: '1 Member',
        price: '₹30',
        description: 'Showcase your knowledge in electrical engineering concepts in this jam session.',
        iconClass: 'fas fa-bolt',
        image: 'images/power.jpg', // Placeholder
        registrationLink: '#',
        buttonText: 'Register Now',
        aosDelay: 100
    },

    // Common Events
    {
        id: 'posterpresentation',
        name: 'Poster Presentation',
        category: 'technical',
        teamSize: '2 Members',
        price: '₹60',
        description: 'Present your ideas on topics provided by coordinators. Creativity meets technicality.',
        iconClass: 'fas fa-palette',
        image: 'images/poster.jpg',
        registrationLink: 'https://forms.gle/kuLibF5FiWCrf8FM6',
        buttonText: 'Register Now',
        aosDelay: 200
    },
    {
        id: 'brainstorming',
        name: 'Brain Storming',
        category: 'technical',
        teamSize: '1 Member',
        price: '₹30',
        description: 'A challenge for core branches to test their problem-solving and brainstorming skills.',
        iconClass: 'fas fa-brain',
        image: 'images/brain.jpg', // Placeholder
        registrationLink: '#',
        buttonText: 'Register Now',
        aosDelay: 0
    }
];

// Export if module system is used, otherwise it's global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = eventsData;
}
