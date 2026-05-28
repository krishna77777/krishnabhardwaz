export const historyQuestions = [
  {
    id: 1,
    question: "Who was the founder of the Maurya Empire?",
    options: ["Chandragupta Maurya", "Ashoka", "Bindusara", "Harsha"],
    correct: 0,
  },
  {
    id: 2,
    question: "The Battle of Plassey was fought in which year?",
    options: ["1757", "1764", "1857", "1761"],
    correct: 0,
  },
  {
    id: 3,
    question: "Who started the 'Quit India Movement'?",
    options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Mahatma Gandhi", "Sardar Patel"],
    correct: 2,
  },
  {
    id: 4,
    question: "The Indus Valley Civilization was discovered in which year?",
    options: ["1921", "1911", "1931", "1941"],
    correct: 0,
  },
  {
    id: 5,
    question: "Who built the Qutub Minar?",
    options: ["Iltutmish", "Qutubuddin Aibak", "Alauddin Khilji", "Balban"],
    correct: 1,
  },
  {
    id: 6,
    question: "The Jallianwala Bagh Massacre took place on which date?",
    options: ["13 April 1919", "23 March 1919", "13 March 1919", "23 April 1919"],
    correct: 0,
  },
  {
    id: 7,
    question: "Who was the first Governor General of free India?",
    options: ["Lord Mountbatten", "C. Rajagopalachari", "Jawaharlal Nehru", "B.R. Ambedkar"],
    correct: 0,
  },
  {
    id: 8,
    question: "The Indian National Congress was founded in which year?",
    options: ["1885", "1895", "1875", "1905"],
    correct: 0,
  },
  {
    id: 9,
    question: "Who wrote 'Arthashastra'?",
    options: ["Kautilya", "Megasthenes", "Banabhatta", "Kalidasa"],
    correct: 0,
  },
  {
    id: 10,
    question: "The Dandi March was started in which year?",
    options: ["1930", "1928", "1932", "1935"],
    correct: 0,
  },
];

export const geographyQuestions = [
  {
    id: 1,
    question: "Which is the longest river in India?",
    options: ["Ganga", "Yamuna", "Godavari", "Brahmaputra"],
    correct: 0,
  },
  {
    id: 2,
    question: "The Thar Desert is located in which state?",
    options: ["Gujarat", "Rajasthan", "Madhya Pradesh", "Maharashtra"],
    correct: 1,
  },
  {
    id: 3,
    question: "Which is the highest peak in India?",
    options: ["Kanchenjunga", "Nanda Devi", "K2 (Godwin-Austen)", "Mount Everest"],
    correct: 2,
  },
  {
    id: 4,
    question: "The Sundarbans delta is formed by which rivers?",
    options: ["Ganga and Brahmaputra", "Ganga and Yamuna", "Krishna and Godavari", "Mahanadi and Godavari"],
    correct: 0,
  },
  {
    id: 5,
    question: "Which Indian state has the largest forest area?",
    options: ["Madhya Pradesh", "Arunachal Pradesh", "Chhattisgarh", "Maharashtra"],
    correct: 0,
  },
  {
    id: 6,
    question: "The Deccan Plateau is bounded by which mountain ranges?",
    options: ["Western and Eastern Ghats", "Himalayas and Vindhyas", "Satpura and Aravalli", "Nilgiri and Cardamom"],
    correct: 0,
  },
  {
    id: 7,
    question: "Which is the largest saltwater lake in India?",
    options: ["Chilika Lake", "Sambhar Lake", "Vembanad Lake", "Pulicat Lake"],
    correct: 0,
  },
  {
    id: 8,
    question: "The Tropic of Cancer passes through how many Indian states?",
    options: ["8", "7", "9", "6"],
    correct: 0,
  },
  {
    id: 9,
    question: "Which river is known as the 'Dakshin Ganga'?",
    options: ["Godavari", "Krishna", "Kaveri", "Narmada"],
    correct: 0,
  },
  {
    id: 10,
    question: "The Himalayas are an example of which type of mountain?",
    options: ["Fold mountains", "Block mountains", "Volcanic mountains", "Residual mountains"],
    correct: 0,
  },
];

export const lucentSubjectWiseQuestions: Record<string, Array<{ id: number; question: string; options: string[]; correct: number }>> = {
  'lucent-gk': [
    {
      id: 1,
      question: "How many fundamental rights are listed in the Indian Constitution?",
      options: ["5", "6", "7", "8"],
      correct: 1,
    },
    {
      id: 2,
      question: "Which article of Indian Constitution deals with Right to Equality?",
      options: ["Article 12", "Article 14", "Article 19", "Article 21"],
      correct: 1,
    },
    {
      id: 3,
      question: "Who is the author of 'Arthashastra'?",
      options: ["Kalidasa", "Kautilya", "Vatsyayan", "Aryabhata"],
      correct: 1,
    },
    {
      id: 4,
      question: "The Mauryan Empire was founded by which ruler?",
      options: ["Bindusara", "Ashoka", "Chandragupta Maurya", "Samudragupta"],
      correct: 2,
    },
    {
      id: 5,
      question: "Which of the following was the capital of the Mauryan Empire?",
      options: ["Mathura", "Pataliputra", "Ujjain", "Taxila"],
      correct: 1,
    },
    {
      id: 6,
      question: "Who was the first President of Independent India?",
      options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Sardar Patel", "C. Rajagopalachari"],
      correct: 1,
    },
    {
      id: 7,
      question: "In which year was the Indian Constitution adopted?",
      options: ["1947", "1949", "1950", "1952"],
      correct: 2,
    },
    {
      id: 8,
      question: "The Indian Constitution was drafted by which constituent?",
      options: ["Indian National Congress", "British Parliament", "Constituent Assembly", "Lok Sabha"],
      correct: 2,
    },
    {
      id: 9,
      question: "Which freedom fighter is known as the 'Father of Indian Nationalism'?",
      options: ["Bal Gangadhar Tilak", "Rammohan Roy", "Bankim Chandra Chatterjee", "Dayananda Saraswati"],
      correct: 1,
    },
    {
      id: 10,
      question: "The Indian Independence Act was passed in which year?",
      options: ["1945", "1946", "1947", "1948"],
      correct: 2,
    },
  ],
  'lucent-science': [
    {
      id: 1,
      question: "What is the SI unit of force?",
      options: ["Dyne", "Erg", "Newton", "Pascal"],
      correct: 2,
    },
    {
      id: 2,
      question: "Which element has the atomic number 8?",
      options: ["Nitrogen", "Oxygen", "Carbon", "Hydrogen"],
      correct: 1,
    },
    {
      id: 3,
      question: "The human body is composed of approximately what percentage of water?",
      options: ["45%", "55%", "65%", "75%"],
      correct: 2,
    },
    {
      id: 4,
      question: "What is the chemical formula for common salt?",
      options: ["NaCl", "KCl", "CaCl2", "MgCl2"],
      correct: 0,
    },
    {
      id: 5,
      question: "Which is the largest organ in the human body?",
      options: ["Heart", "Brain", "Liver", "Kidney"],
      correct: 2,
    },
    {
      id: 6,
      question: "What is the speed of light in vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
      correct: 0,
    },
    {
      id: 7,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Mercury", "Jupiter"],
      correct: 1,
    },
    {
      id: 8,
      question: "What is the boiling point of water at standard pressure?",
      options: ["90°C", "100°C", "110°C", "120°C"],
      correct: 1,
    },
    {
      id: 9,
      question: "Which type of blood is the universal donor?",
      options: ["A", "B", "AB", "O"],
      correct: 3,
    },
    {
      id: 10,
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      correct: 2,
    },
  ],
};

export const ghatnachakraQuestions: Record<string, Array<{ id: number; question: string; options: string[]; correct: number }>> = {
  'ghatnachakra-history': [
    {
      id: 1,
      question: "In which year did the Baikal-Amur Railway project begin?",
      options: ["1974", "1975", "1976", "1977"],
      correct: 0,
    },
    {
      id: 2,
      question: "The First Five Year Plan in India was launched in which year?",
      options: ["1950", "1951", "1952", "1953"],
      correct: 1,
    },
    {
      id: 3,
      question: "Who was the first Chief Justice of India?",
      options: ["H.J. Kania", "B.K. Mukerji", "Meher Chand Mahajan", "S.R. Das"],
      correct: 0,
    },
    {
      id: 4,
      question: "The Indian National Flag was adopted on which date?",
      options: ["15 August 1947", "26 January 1950", "22 July 1947", "15 August 1950"],
      correct: 2,
    },
    {
      id: 5,
      question: "Which movement was started by Gandhi in 1942?",
      options: ["Swadeshi Movement", "Quit India Movement", "Civil Disobedience", "Non-Cooperation Movement"],
      correct: 1,
    },
    {
      id: 6,
      question: "The partition of Bengal was done by which British Viceroy?",
      options: ["Lord Curzon", "Lord Ripon", "Lord Dufferin", "Lord Linlithgow"],
      correct: 0,
    },
    {
      id: 7,
      question: "In which year did the Sepoy Mutiny occur?",
      options: ["1855", "1857", "1859", "1861"],
      correct: 1,
    },
    {
      id: 8,
      question: "Who founded the Indian National Army?",
      options: ["Subhas Chandra Bose", "Bhagat Singh", "Khudiram Bose", "Surya Sen"],
      correct: 0,
    },
    {
      id: 9,
      question: "The Brahmo Samaj was founded by whom?",
      options: ["Rammohan Roy", "Keshab Chandra Sen", "Debendranath Tagore", "Ishwar Chandra Vidyasagar"],
      correct: 0,
    },
    {
      id: 10,
      question: "Which treaty ended the First Afghan War?",
      options: ["Treaty of Amritsar", "Treaty of Lahore", "Treaty of Kandahar", "Treaty of Peshawar"],
      correct: 0,
    },
  ],
  'ghatnachakra-geography': [
    {
      id: 1,
      question: "Which state has the longest coastline in India?",
      options: ["Gujarat", "Maharashtra", "Andhra Pradesh", "Tamil Nadu"],
      correct: 2,
    },
    {
      id: 2,
      question: "The Nilgiri Mountain Railway is located in which state?",
      options: ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh"],
      correct: 1,
    },
    {
      id: 3,
      question: "Which river is known as the 'Sorrow of Bengal'?",
      options: ["Ganga", "Brahmaputra", "Damodar", "Hooghly"],
      correct: 2,
    },
    {
      id: 4,
      question: "The Great Indian Desert is another name for which desert?",
      options: ["Thar Desert", "Lut Desert", "Kalahari Desert", "Atacama Desert"],
      correct: 0,
    },
    {
      id: 5,
      question: "Which state is called the 'Spice Garden of India'?",
      options: ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh"],
      correct: 1,
    },
    {
      id: 6,
      question: "The Plimsoll Line is used to measure what?",
      options: ["Water depth", "Ship loading limit", "River width", "Ocean temperature"],
      correct: 1,
    },
    {
      id: 7,
      question: "Which plateau is located in southern India?",
      options: ["Malwa Plateau", "Deccan Plateau", "Chota Nagpur Plateau", "Meghalaya Plateau"],
      correct: 1,
    },
    {
      id: 8,
      question: "The Malabar Coast is located along which sea?",
      options: ["Bay of Bengal", "Arabian Sea", "Indian Ocean", "Andaman Sea"],
      correct: 1,
    },
    {
      id: 9,
      question: "Which mountain range separates India from Nepal?",
      options: ["Western Ghats", "Eastern Ghats", "Himalayas", "Vindhyas"],
      correct: 2,
    },
    {
      id: 10,
      question: "The Chota Nagpur Plateau is rich in which mineral?",
      options: ["Gold", "Iron ore", "Coal", "Copper"],
      correct: 2,
    },
  ],
};
