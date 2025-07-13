# Deen Circle - Islamic Social Platform

A modern, halal social platform designed to connect Muslim communities through events, learning, charity, and meaningful interactions.

## 🌟 Features

### **Community & Social**
- **User Profiles**: Customizable profiles with interests, bio, and profile pictures
- **Community Feed**: Share posts, duas, verses, and event updates
- **Friends Stories**: See what events your friends are attending
- **Community Discovery**: Find and join Islamic communities and organizations

### **Event Management**
- **Event Discovery**: Browse Islamic events in your area
- **Interest System**: Click "Interested" to track events you want to attend
- **Event Details**: Comprehensive event information with maps and organizers
- **My Events**: View all events you're interested in on your profile
- **Event Categories**: Prayer, Education, Community, Charity, and more

### **Learning & Education**
- **Islamic Courses**: Access to Quran recitation, Islamic history, and more
- **Learning Tracks**: Structured learning paths for different skill levels
- **Progress Tracking**: Monitor your learning journey

### **Charity & Giving**
- **Charity Campaigns**: Discover and support Islamic charity initiatives
- **Donation Tracking**: Transparent giving with progress updates
- **Community Support**: Help those in need within the Ummah

### **Advanced Features**
- **Tag System**: Add interests and discover relevant content
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Persistent Storage**: Your data is saved across sessions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_REPOSITORY_URL>
cd nur-community-hub

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🛠 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand for lightweight state management
- **Routing**: React Router for navigation
- **Icons**: Lucide React for beautiful, consistent icons
- **UI Components**: Custom components built with Radix UI primitives

## 📱 Key Components

### **Event Interest System**
- Toggle interest in events with visual feedback
- Green button state with filled heart icon
- Toast notifications for user actions
- Persistent storage across sessions
- Integration with user profiles

### **Profile Management**
- Editable name, bio, and profile picture
- Interest tags with dialog-based management
- My Events tab showing interested events
- Community and post history

### **Toast Notification System**
- Success/error notifications
- Auto-dismiss with smooth animations
- Bottom-right positioning
- Manual close functionality

## 🎨 Design System

The application uses a comprehensive design system with:
- **Islamic Color Palette**: Respectful and culturally appropriate colors
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: WCAG compliant components
- **Smooth Animations**: Enhanced user experience with transitions

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── EventCard.tsx  # Event display component
│   ├── PostCard.tsx   # Social post component
│   └── Toast.tsx      # Notification component
├── pages/             # Application pages
│   ├── Index.tsx      # Home feed
│   ├── Events.tsx     # Event discovery
│   ├── Profile.tsx    # User profile
│   └── ...
├── stores/            # State management
│   ├── profileStore.ts
│   └── eventInterestStore.ts
├── hooks/             # Custom React hooks
│   └── useToast.ts
└── assets/            # Images and static files
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Consistent component structure

## 🌐 Deployment

### Lovable Platform
Deploy directly through [Lovable](https://lovable.dev) by clicking Share → Publish.

### Custom Domain
Connect your own domain through Project → Settings → Domains.

### Manual Deployment
Build the project and deploy the `dist` folder to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with love for the Muslim community
- Inspired by the need for halal social platforms
- Designed to strengthen the bonds of the Ummah

---

**Nur Community Hub** - Connecting hearts, strengthening faith, building community. 🌟
