import { NextRequest, NextResponse } from 'next/server';

interface Resource {
  title: string;
  type: 'video' | 'article' | 'tutorial' | 'documentation' | 'practice';
  url: string;
  description: string;
  platform: string;
  difficulty: string;
  icon: string;
}

function getResourcesForTopic(topic: string): Resource[] {
  const lowerTopic = topic.toLowerCase();

  // Python Resources
  if (lowerTopic.includes('python')) {
    return [
      {
        title: 'Python for Everybody - Full Course',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=8DvO-7_9t-o',
        description: 'Comprehensive Python course from beginner to advanced',
        platform: 'YouTube',
        difficulty: 'Beginner',
        icon: '🎥',
      },
      {
        title: 'Python Official Documentation',
        type: 'documentation',
        url: 'https://docs.python.org/3/',
        description: 'Official Python documentation and reference guide',
        platform: 'Python.org',
        difficulty: 'All Levels',
        icon: '📖',
      },
      {
        title: 'Real Python - Python Tutorials',
        type: 'article',
        url: 'https://realpython.com/',
        description: 'In-depth Python tutorials and articles',
        platform: 'Real Python',
        difficulty: 'Intermediate',
        icon: '📝',
      },
      {
        title: 'LeetCode - Python Practice',
        type: 'practice',
        url: 'https://leetcode.com/problemset/all/?topicSlugs=array',
        description: 'Practice Python coding problems',
        platform: 'LeetCode',
        difficulty: 'All Levels',
        icon: '💻',
      },
      {
        title: 'Python Tutorial - W3Schools',
        type: 'tutorial',
        url: 'https://www.w3schools.com/python/',
        description: 'Interactive Python tutorial with examples',
        platform: 'W3Schools',
        difficulty: 'Beginner',
        icon: '🎓',
      },
    ];
  }

  // JavaScript Resources
  if (lowerTopic.includes('javascript') || lowerTopic.includes('js')) {
    return [
      {
        title: 'JavaScript Complete Course 2024',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=jS4aFq5-91o',
        description: 'Complete JavaScript course covering all concepts',
        platform: 'YouTube',
        difficulty: 'Beginner',
        icon: '🎥',
      },
      {
        title: 'MDN Web Docs - JavaScript Guide',
        type: 'documentation',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
        description: 'Mozilla official JavaScript documentation',
        platform: 'Mozilla',
        difficulty: 'All Levels',
        icon: '📖',
      },
      {
        title: 'JavaScript.info - The Modern JavaScript Tutorial',
        type: 'tutorial',
        url: 'https://javascript.info/',
        description: 'Modern JavaScript tutorial with interactive examples',
        platform: 'JavaScript.info',
        difficulty: 'Beginner',
        icon: '🎓',
      },
      {
        title: 'HackerRank - JavaScript Practice',
        type: 'practice',
        url: 'https://www.hackerrank.com/domains/javascript',
        description: 'Practice JavaScript coding challenges',
        platform: 'HackerRank',
        difficulty: 'All Levels',
        icon: '💻',
      },
      {
        title: 'Eloquent JavaScript - Free Book',
        type: 'article',
        url: 'https://eloquentjavascript.net/',
        description: 'Free online book about JavaScript',
        platform: 'Eloquent JS',
        difficulty: 'Intermediate',
        icon: '📚',
      },
    ];
  }

  // Web Development Resources
  if (lowerTopic.includes('web') || lowerTopic.includes('html') || lowerTopic.includes('css')) {
    return [
      {
        title: 'The Complete Web Development Bootcamp',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=Nu-dhbNQbS0',
        description: 'Full stack web development course',
        platform: 'YouTube',
        difficulty: 'Beginner',
        icon: '🎥',
      },
      {
        title: 'MDN Web Docs - Web Development',
        type: 'documentation',
        url: 'https://developer.mozilla.org/en-US/docs/Learn',
        description: 'Complete web development learning resource',
        platform: 'Mozilla',
        difficulty: 'All Levels',
        icon: '📖',
      },
      {
        title: 'CSS-Tricks - Web Design Articles',
        type: 'article',
        url: 'https://css-tricks.com/',
        description: 'In-depth articles about web design and CSS',
        platform: 'CSS-Tricks',
        difficulty: 'Intermediate',
        icon: '🎨',
      },
      {
        title: 'CodePen - Frontend Practice',
        type: 'practice',
        url: 'https://codepen.io/',
        description: 'Practice and showcase frontend projects',
        platform: 'CodePen',
        difficulty: 'All Levels',
        icon: '💻',
      },
      {
        title: 'W3Schools - Web Development',
        type: 'tutorial',
        url: 'https://www.w3schools.com/',
        description: 'Interactive web development tutorials',
        platform: 'W3Schools',
        difficulty: 'Beginner',
        icon: '🎓',
      },
    ];
  }

  // React Resources
  if (lowerTopic.includes('react')) {
    return [
      {
        title: 'React Course - Full Tutorial',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
        description: 'Complete React course from basics to advanced',
        platform: 'YouTube',
        difficulty: 'Intermediate',
        icon: '🎥',
      },
      {
        title: 'React Official Documentation',
        type: 'documentation',
        url: 'https://react.dev/',
        description: 'Official React documentation and guides',
        platform: 'React.dev',
        difficulty: 'All Levels',
        icon: '📖',
      },
      {
        title: 'Scrimba - React Course',
        type: 'tutorial',
        url: 'https://scrimba.com/learn/learnreact',
        description: 'Interactive React learning platform',
        platform: 'Scrimba',
        difficulty: 'Beginner',
        icon: '🎓',
      },
      {
        title: 'LeetCode - React Challenges',
        type: 'practice',
        url: 'https://leetcode.com/discuss/interview-question/javascript/',
        description: 'React and JavaScript interview challenges',
        platform: 'LeetCode',
        difficulty: 'Advanced',
        icon: '💻',
      },
      {
        title: 'React Patterns - Best Practices',
        type: 'article',
        url: 'https://reactpatterns.com/',
        description: 'Common React patterns and best practices',
        platform: 'ReactPatterns',
        difficulty: 'Intermediate',
        icon: '📝',
      },
    ];
  }

  // Machine Learning Resources
  if (lowerTopic.includes('machine learning') || lowerTopic.includes('ml') || lowerTopic.includes('ai')) {
    return [
      {
        title: 'Machine Learning Course by Andrew Ng',
        type: 'video',
        url: 'https://www.youtube.com/playlist?list=PLkDaJ6liZXabqac9fBSJeTF0xNJfhnVX3',
        description: 'Comprehensive machine learning course',
        platform: 'YouTube',
        difficulty: 'Intermediate',
        icon: '🎥',
      },
      {
        title: 'TensorFlow Official Documentation',
        type: 'documentation',
        url: 'https://www.tensorflow.org/learn',
        description: 'TensorFlow machine learning library docs',
        platform: 'TensorFlow',
        difficulty: 'Intermediate',
        icon: '📖',
      },
      {
        title: 'Kaggle Learn - ML Tutorials',
        type: 'tutorial',
        url: 'https://www.kaggle.com/learn',
        description: 'Free interactive machine learning tutorials',
        platform: 'Kaggle',
        difficulty: 'Beginner',
        icon: '🎓',
      },
      {
        title: 'Kaggle Competitions',
        type: 'practice',
        url: 'https://www.kaggle.com/competitions',
        description: 'Participate in ML competitions and practice',
        platform: 'Kaggle',
        difficulty: 'All Levels',
        icon: '💻',
      },
      {
        title: 'Distill.pub - ML Articles',
        type: 'article',
        url: 'https://distill.pub/',
        description: 'Clear explanations of machine learning concepts',
        platform: 'Distill',
        difficulty: 'Advanced',
        icon: '📚',
      },
    ];
  }

  // Data Science Resources
  if (lowerTopic.includes('data science') || lowerTopic.includes('data analysis')) {
    return [
      {
        title: 'Data Science Full Course',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=ua-CiDNNj30',
        description: 'Complete data science course with Python',
        platform: 'YouTube',
        difficulty: 'Intermediate',
        icon: '🎥',
      },
      {
        title: 'Pandas Documentation',
        type: 'documentation',
        url: 'https://pandas.pydata.org/docs/',
        description: 'Official Pandas data analysis library docs',
        platform: 'Pandas',
        difficulty: 'All Levels',
        icon: '📖',
      },
      {
        title: 'DataCamp - Data Science Courses',
        type: 'tutorial',
        url: 'https://www.datacamp.com/',
        description: 'Interactive data science learning platform',
        platform: 'DataCamp',
        difficulty: 'Beginner',
        icon: '🎓',
      },
      {
        title: 'Kaggle Datasets & Projects',
        type: 'practice',
        url: 'https://www.kaggle.com/datasets',
        description: 'Real-world datasets for practice projects',
        platform: 'Kaggle',
        difficulty: 'All Levels',
        icon: '💻',
      },
      {
        title: 'Towards Data Science - Medium',
        type: 'article',
        url: 'https://towardsdatascience.com/',
        description: 'Data science articles and tutorials',
        platform: 'Medium',
        difficulty: 'Intermediate',
        icon: '📝',
      },
    ];
  }

  // Default resources for any topic
  return [
    {
      title: `Learn ${topic} - YouTube Tutorial`,
      type: 'video',
      url: `https://www.youtube.com/results?search_query=learn+${topic}`,
      description: `Find video tutorials about ${topic}`,
      platform: 'YouTube',
      difficulty: 'Beginner',
      icon: '🎥',
    },
    {
      title: `${topic} - Articles & Guides`,
      type: 'article',
      url: `https://www.medium.com/search?q=${topic}`,
      description: `Find articles and guides about ${topic}`,
      platform: 'Medium',
      difficulty: 'Intermediate',
      icon: '📝',
    },
    {
      title: `${topic} Documentation`,
      type: 'documentation',
      url: `https://www.google.com/search?q=${topic}+documentation`,
      description: `Official documentation for ${topic}`,
      platform: 'Google Search',
      difficulty: 'All Levels',
      icon: '📖',
    },
    {
      title: `Practice ${topic}`,
      type: 'practice',
      url: `https://www.hackerrank.com/domains`,
      description: `Practice problems related to ${topic}`,
      platform: 'HackerRank',
      difficulty: 'All Levels',
      icon: '💻',
    },
    {
      title: `${topic} Tutorial for Beginners`,
      type: 'tutorial',
      url: `https://www.w3schools.com/`,
      description: `Interactive tutorials about ${topic}`,
      platform: 'W3Schools',
      difficulty: 'Beginner',
      icon: '🎓',
    },
  ];
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const resources = getResourcesForTopic(topic);

    return NextResponse.json({ resources });
  } catch (error) {
    console.error('Resources API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}
