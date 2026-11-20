import React, { useState, useEffect } from 'react';
import TopHeader from './components/TopHeader';
import MainHeader from './components/MainHeader';
import Navbar from './components/Navbar';
import BannerSection from './components/BannerSection';
import CakeCategoriesSection from './components/CakeCategoriesSection';
import BestsellersSection from './components/BestsellersSection';
import BestCakesInDubaiSection from './components/BestCakesInDubaiSection';
import ChefStorySection from './components/ChefStorySection';
import ReviewsSection from './components/ReviewsSection';
import FooterSection from './components/FooterSection';
import CustomizeCakeModal from './components/CustomizeCakeModal';
import CustomizePage from './components/CustomizePage';
import CookiesPage from './components/CookiesPage';
import CupcakesPage from './components/CupcakesPage';
import CakePopsPage from './components/CakePopsPage';
import CakesForKidsPage from './components/CakesForKidsPage';
import CakesForGuysPage from './components/CakesForGuysPage';
import CakesForLadiesPage from './components/CakesForLadiesPage';
import ClassicWeddingCakesPage from './components/ClassicWeddingCakesPage';
import NoveltyWeddingCakesPage from './components/NoveltyWeddingCakesPage';
import BrideToBeCakesPage from './components/BrideToBeCakesPage';
import EngagementCakesPage from './components/EngagementCakesPage';
import GroomsCakesPage from './components/GroomsCakesPage';
import CorporateCakesPage from './components/CorporateCakesPage';
import CorporateCookiesPage from './components/CorporateCookiesPage';
import CupcakesWithLogoPage from './components/CupcakesWithLogoPage';
import GraduationCakesPage from './components/GraduationCakesPage';
import VehiclesCakesPage from './components/VehiclesCakesPage';
import SportingCakesPage from './components/SportingCakesPage';
import CoutureCakesPage from './components/CoutureCakesPage';
import ThreeDCakesPage from './components/ThreeDCakesPage';
import IllusionCakesPage from './components/IllusionCakesPage';
import DoughnutsCakesPage from './components/DoughnutsCakesPage';
import PhotoOnCakePage from './components/PhotoOnCakePage';
import PetAnimalsCakesPage from './components/PetAnimalsCakesPage';
import SuperheroCakesPage from './components/SuperheroCakesPage';
import LabubuCakesPage from './components/LabubuCakesPage';
import BakingDecoratingPage from './components/BakingDecoratingPage';
import AdminDashboard from './components/admin/AdminDashboard';
import { translations } from './translations';
import { Phone, Mail, Clock, X, Check, ShoppingBag, UserRound } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#customize') return 'customize';
      if (window.location.hash === '#cookies') return 'cookies';
      if (window.location.hash === '#cupcakes') return 'cupcakes';
      if (window.location.hash === '#cake-pops') return 'cake-pops';
      if (window.location.hash === '#cakes-for-kids') return 'cakes-for-kids';
      if (window.location.hash === '#cakes-for-guys') return 'cakes-for-guys';
      if (window.location.hash === '#cakes-for-ladies') return 'cakes-for-ladies';
      if (window.location.hash === '#classic-wedding-cakes' || window.location.hash === '#wedding-cakes') return 'classic-wedding-cakes';
      if (window.location.hash === '#novelty-wedding-cakes') return 'novelty-wedding-cakes';
      if (window.location.hash === '#bride-to-be-cakes') return 'bride-to-be-cakes';
      if (window.location.hash === '#engagement-cakes') return 'engagement-cakes';
      if (window.location.hash === '#grooms-cakes') return 'grooms-cakes';
      if (window.location.hash === '#corporate-cakes') return 'corporate-cakes';
      if (window.location.hash === '#corporate-cookies') return 'corporate-cookies';
      if (window.location.hash === '#cupcakes-with-logo') return 'cupcakes-with-logo';
      if (window.location.hash === '#graduation-cakes' || window.location.hash === '#graduation') return 'graduation-cakes';
      if (window.location.hash === '#cars-ships-planes-cakes' || window.location.hash === '#vehicles') return 'cars-ships-planes-cakes';
      if (window.location.hash === '#sporting-cakes' || window.location.hash === '#sporting') return 'sporting-cakes';
      if (window.location.hash === '#couture-cakes' || window.location.hash === '#couture') return 'couture-cakes';
      if (window.location.hash === '#3d-cakes' || window.location.hash === '#3d-art') return '3d-cakes';
      if (window.location.hash === '#food-drink-illusion-cakes' || window.location.hash === '#illusion') return 'food-drink-illusion-cakes';
      if (window.location.hash === '#doughnuts-cakes' || window.location.hash === '#doughnuts') return 'doughnuts-cakes';
      if (window.location.hash === '#photo-on-cake' || window.location.hash === '#photo') return 'photo-on-cake';
      if (window.location.hash === '#pet-animals-cakes' || window.location.hash === '#pets') return 'pet-animals-cakes';
      if (window.location.hash === '#superhero-cakes' || window.location.hash === '#superheroes') return 'superhero-cakes';
      if (window.location.hash === '#labubu-cakes' || window.location.hash === '#labubu') return 'labubu-cakes';
      if (window.location.hash === '#cake-baking-decorating' || window.location.hash === '#classes') return 'cake-baking-decorating';
      if (window.location.hash === '#admin' || window.location.hash === '#admin-dashboard') return 'admin';
    }
    return 'home';
  });
  const [activeCategory, setActiveCategory] = useState('all-cakes');
  const [cartCount, setCartCount] = useState(2);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const t = translations[currentLang] || translations.en;
  const isAr = currentLang === 'ar';

  // Synchronize HTML dir attribute for full RTL support
  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang, isAr]);

  // Synchronize URL hash with page state
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#customize') {
        setCurrentPage('customize');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#cookies') {
        setCurrentPage('cookies');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#cupcakes') {
        setCurrentPage('cupcakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#cake-pops') {
        setCurrentPage('cake-pops');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#cakes-for-kids') {
        setCurrentPage('cakes-for-kids');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#cakes-for-guys') {
        setCurrentPage('cakes-for-guys');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#cakes-for-ladies') {
        setCurrentPage('cakes-for-ladies');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#classic-wedding-cakes' || window.location.hash === '#wedding-cakes') {
        setCurrentPage('classic-wedding-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#novelty-wedding-cakes') {
        setCurrentPage('novelty-wedding-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#bride-to-be-cakes') {
        setCurrentPage('bride-to-be-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#engagement-cakes') {
        setCurrentPage('engagement-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#grooms-cakes') {
        setCurrentPage('grooms-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#corporate-cakes') {
        setCurrentPage('corporate-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#corporate-cookies') {
        setCurrentPage('corporate-cookies');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#cupcakes-with-logo') {
        setCurrentPage('cupcakes-with-logo');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#graduation-cakes' || window.location.hash === '#graduation') {
        setCurrentPage('graduation-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#cars-ships-planes-cakes' || window.location.hash === '#vehicles') {
        setCurrentPage('cars-ships-planes-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#sporting-cakes' || window.location.hash === '#sporting') {
        setCurrentPage('sporting-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#couture-cakes' || window.location.hash === '#couture') {
        setCurrentPage('couture-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#3d-cakes' || window.location.hash === '#3d-art') {
        setCurrentPage('3d-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#food-drink-illusion-cakes' || window.location.hash === '#illusion') {
        setCurrentPage('food-drink-illusion-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#doughnuts-cakes' || window.location.hash === '#doughnuts') {
        setCurrentPage('doughnuts-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#photo-on-cake' || window.location.hash === '#photo') {
        setCurrentPage('photo-on-cake');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#pet-animals-cakes' || window.location.hash === '#pets') {
        setCurrentPage('pet-animals-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#superhero-cakes' || window.location.hash === '#superheroes') {
        setCurrentPage('superhero-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#labubu-cakes' || window.location.hash === '#labubu') {
        setCurrentPage('labubu-cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#cake-baking-decorating' || window.location.hash === '#classes') {
        setCurrentPage('cake-baking-decorating');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#admin' || window.location.hash === '#admin-dashboard') {
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openCustomizePage = () => {
    window.location.hash = '#customize';
    setCurrentPage('customize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCookiesPage = () => {
    window.location.hash = '#cookies';
    setCurrentPage('cookies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCupcakesPage = () => {
    window.location.hash = '#cupcakes';
    setCurrentPage('cupcakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCakePopsPage = () => {
    window.location.hash = '#cake-pops';
    setCurrentPage('cake-pops');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCakesForKidsPage = () => {
    window.location.hash = '#cakes-for-kids';
    setCurrentPage('cakes-for-kids');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCakesForGuysPage = () => {
    window.location.hash = '#cakes-for-guys';
    setCurrentPage('cakes-for-guys');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCakesForLadiesPage = () => {
    window.location.hash = '#cakes-for-ladies';
    setCurrentPage('cakes-for-ladies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openClassicWeddingCakesPage = () => {
    window.location.hash = '#classic-wedding-cakes';
    setCurrentPage('classic-wedding-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openNoveltyWeddingCakesPage = () => {
    window.location.hash = '#novelty-wedding-cakes';
    setCurrentPage('novelty-wedding-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBrideToBeCakesPage = () => {
    window.location.hash = '#bride-to-be-cakes';
    setCurrentPage('bride-to-be-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEngagementCakesPage = () => {
    window.location.hash = '#engagement-cakes';
    setCurrentPage('engagement-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openGroomsCakesPage = () => {
    window.location.hash = '#grooms-cakes';
    setCurrentPage('grooms-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCorporateCakesPage = () => {
    window.location.hash = '#corporate-cakes';
    setCurrentPage('corporate-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCorporateCookiesPage = () => {
    window.location.hash = '#corporate-cookies';
    setCurrentPage('corporate-cookies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCupcakesWithLogoPage = () => {
    window.location.hash = '#cupcakes-with-logo';
    setCurrentPage('cupcakes-with-logo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openGraduationCakesPage = () => {
    window.location.hash = '#graduation-cakes';
    setCurrentPage('graduation-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openVehiclesCakesPage = () => {
    window.location.hash = '#cars-ships-planes-cakes';
    setCurrentPage('cars-ships-planes-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSportingCakesPage = () => {
    window.location.hash = '#sporting-cakes';
    setCurrentPage('sporting-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCoutureCakesPage = () => {
    window.location.hash = '#couture-cakes';
    setCurrentPage('couture-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openThreeDCakesPage = () => {
    window.location.hash = '#3d-cakes';
    setCurrentPage('3d-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openIllusionCakesPage = () => {
    window.location.hash = '#food-drink-illusion-cakes';
    setCurrentPage('food-drink-illusion-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDoughnutsCakesPage = () => {
    window.location.hash = '#doughnuts-cakes';
    setCurrentPage('doughnuts-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPhotoOnCakePage = () => {
    window.location.hash = '#photo-on-cake';
    setCurrentPage('photo-on-cake');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPetAnimalsCakesPage = () => {
    window.location.hash = '#pet-animals-cakes';
    setCurrentPage('pet-animals-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSuperheroCakesPage = () => {
    window.location.hash = '#superhero-cakes';
    setCurrentPage('superhero-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLabubuCakesPage = () => {
    window.location.hash = '#labubu-cakes';
    setCurrentPage('labubu-cakes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBakingDecoratingPage = () => {
    window.location.hash = '#cake-baking-decorating';
    setCurrentPage('cake-baking-decorating');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNavigation = (id) => {
    if (id === 'cookies' || id === 'cookies-cat') {
      openCookiesPage();
      return;
    }
    if (id === 'cupcakes' || id === 'cupcakes-cat') {
      openCupcakesPage();
      return;
    }
    if (id === 'cake-pops' || id === 'cake-pops-cat') {
      openCakePopsPage();
      return;
    }
    if (id === 'cakes-for-kids' || id === 'kids-cat') {
      openCakesForKidsPage();
      return;
    }
    if (id === 'cakes-for-guys' || id === 'guys' || id === 'boys') {
      openCakesForGuysPage();
      return;
    }
    if (id === 'cakes-for-ladies' || id === 'ladies' || id === 'girls') {
      openCakesForLadiesPage();
      return;
    }
    if (id === 'classic-wedding-cakes' || id === 'wedding-cakes' || id === 'wedding') {
      openClassicWeddingCakesPage();
      return;
    }
    if (id === 'novelty-wedding-cakes') {
      openNoveltyWeddingCakesPage();
      return;
    }
    if (id === 'bride-to-be-cakes') {
      openBrideToBeCakesPage();
      return;
    }
    if (id === 'engagement-cakes') {
      openEngagementCakesPage();
      return;
    }
    if (id === 'grooms-cakes') {
      openGroomsCakesPage();
      return;
    }
    if (id === 'corporate-cakes') {
      openCorporateCakesPage();
      return;
    }
    if (id === 'corporate-cookies') {
      openCorporateCookiesPage();
      return;
    }
    if (id === 'cupcakes-with-logo') {
      openCupcakesWithLogoPage();
      return;
    }
    if (id === 'graduation' || id === 'graduation-cakes') {
      openGraduationCakesPage();
      return;
    }
    if (id === 'vehicles' || id === 'cars-ships-planes-cakes') {
      openVehiclesCakesPage();
      return;
    }
    if (id === 'sporting' || id === 'sporting-cakes') {
      openSportingCakesPage();
      return;
    }
    if (id === 'couture' || id === 'couture-cakes') {
      openCoutureCakesPage();
      return;
    }
    if (id === '3d-art' || id === '3d-cakes') {
      openThreeDCakesPage();
      return;
    }
    if (id === 'illusion' || id === 'food-drink-illusion-cakes') {
      openIllusionCakesPage();
      return;
    }
    if (id === 'doughnuts' || id === 'doughnuts-cakes') {
      openDoughnutsCakesPage();
      return;
    }
    if (id === 'photo' || id === 'photo-on-cake') {
      openPhotoOnCakePage();
      return;
    }
    if (id === 'pets' || id === 'pet-animals-cakes') {
      openPetAnimalsCakesPage();
      return;
    }
    if (id === 'superheroes' || id === 'superhero-cakes') {
      openSuperheroCakesPage();
      return;
    }
    if (id === 'labubu' || id === 'labubu-cakes') {
      openLabubuCakesPage();
      return;
    }
    if (id === 'classes' || id === 'cake-baking-decorating') {
      openBakingDecoratingPage();
      return;
    }
    if (currentPage !== 'home') goToHome();
    setActiveCategory(id);
    const el = document.getElementById('cake-categories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const goToHome = () => {
    window.location.hash = '';
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item) => {
    setCartCount((prev) => prev + 1);
    const itemName = item.title || item.occasion || 'Cake';
    const detail = item.price ? `${item.price} AED` : item.flavor ? `(${item.flavor})` : '';
    setToastMessage(
      isAr 
        ? `تمت إضافة "${itemName}" إلى حقيبتك بنجاح!` 
        : `Added "${itemName}" to your bag!`
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  if (currentPage === 'admin') {
    return <AdminDashboard onBackToStore={goToHome} />;
  }

  return (
    <div className={`min-h-screen bg-[#FFF9F0] text-[#4A2116] flex flex-col font-sans selection:bg-[#C58A19] selection:text-white w-full max-w-full overflow-x-hidden relative ${isAr ? 'font-arabic' : 'font-poppins'}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 bg-[#4A2116] text-[#FFF9F0] px-5 py-3 rounded-xl shadow-2xl border border-[#C58A19] flex items-center gap-3 animate-fadeIn">
          <div className="w-6 h-6 rounded-full bg-[#C58A19] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 1. Level 1: Top Contact Bar (Height ~30-35px, #F8F1E6, Phone + Language RTL toggle) */}
      <TopHeader 
        currentLang={currentLang} 
        onLanguageChange={(lang) => setCurrentLang(lang)} 
      />

      {/* 2. Level 2: Main Header (Height ~75-85px, #FFF9F0, Logo ~350-400px, Search with gold button & 10px rounded, CircleHelp, UserRound, ShoppingBag) */}
      <MainHeader 
        currentLang={currentLang}
        cartCount={cartCount}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenBag={() => setIsBagOpen(true)}
        onLogoClick={goToHome}
      />

      {/* 3. Level 3: Category Navigation Bar (Height ~48-52px, #FFFFFF, border-y #F5EBDD, Poppins, 14-15px, Hover gold underline, Dropdowns, Customize Cake Button in #C58A19) */}
      <Navbar 
        currentLang={currentLang}
        activeCategory={
          [
            'cookies',
            'cupcakes',
            'cake-pops',
            'cakes-for-kids',
            'cakes-for-guys',
            'cakes-for-ladies',
            'classic-wedding-cakes',
            'novelty-wedding-cakes',
            'bride-to-be-cakes',
            'engagement-cakes',
            'grooms-cakes',
            'corporate-cakes',
            'corporate-cookies',
            'cupcakes-with-logo'
          ].includes(currentPage)
            ? currentPage
            : activeCategory
        }
        onSelectCategory={handleCategoryNavigation}
        onCustomizeClick={openCustomizePage}
      />

      {/* Page View: Either Dedicated Multi-Step Customize Page OR Dedicated Category Pages OR Homepage */}
      {currentPage === 'customize' ? (
        <main className="w-full flex-1">
          <CustomizePage
            currentLang={currentLang}
            onBackToHome={goToHome}
            onAddToCart={handleAddToCart}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        </main>
      ) : currentPage === 'cookies' ? (
        <main className="w-full flex-1">
          <CookiesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'cupcakes' ? (
        <main className="w-full flex-1">
          <CupcakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'cake-pops' ? (
        <main className="w-full flex-1">
          <CakePopsPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'cakes-for-kids' ? (
        <main className="w-full flex-1">
          <CakesForKidsPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'cakes-for-guys' ? (
        <main className="w-full flex-1">
          <CakesForGuysPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'cakes-for-ladies' ? (
        <main className="w-full flex-1">
          <CakesForLadiesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'classic-wedding-cakes' ? (
        <main className="w-full flex-1">
          <ClassicWeddingCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'novelty-wedding-cakes' ? (
        <main className="w-full flex-1">
          <NoveltyWeddingCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'bride-to-be-cakes' ? (
        <main className="w-full flex-1">
          <BrideToBeCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'engagement-cakes' ? (
        <main className="w-full flex-1">
          <EngagementCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'grooms-cakes' ? (
        <main className="w-full flex-1">
          <GroomsCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'corporate-cakes' ? (
        <main className="w-full flex-1">
          <CorporateCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'corporate-cookies' ? (
        <main className="w-full flex-1">
          <CorporateCookiesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'cupcakes-with-logo' ? (
        <main className="w-full flex-1">
          <CupcakesWithLogoPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'graduation-cakes' ? (
        <main className="w-full flex-1">
          <GraduationCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'cars-ships-planes-cakes' ? (
        <main className="w-full flex-1">
          <VehiclesCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'sporting-cakes' ? (
        <main className="w-full flex-1">
          <SportingCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'couture-cakes' ? (
        <main className="w-full flex-1">
          <CoutureCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === '3d-cakes' ? (
        <main className="w-full flex-1">
          <ThreeDCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'food-drink-illusion-cakes' ? (
        <main className="w-full flex-1">
          <IllusionCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'doughnuts-cakes' ? (
        <main className="w-full flex-1">
          <DoughnutsCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'photo-on-cake' ? (
        <main className="w-full flex-1">
          <PhotoOnCakePage currentLang={currentLang} />
        </main>
      ) : currentPage === 'pet-animals-cakes' ? (
        <main className="w-full flex-1">
          <PetAnimalsCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'superhero-cakes' ? (
        <main className="w-full flex-1">
          <SuperheroCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'labubu-cakes' ? (
        <main className="w-full flex-1">
          <LabubuCakesPage currentLang={currentLang} />
        </main>
      ) : currentPage === 'cake-baking-decorating' ? (
        <main className="w-full flex-1">
          <BakingDecoratingPage currentLang={currentLang} />
        </main>
      ) : (
        <main className="w-full flex-1">
          {/* 4. Level 4: Homepage Hero Section (Height 380-450px on desktop, original photography, slider transition) */}
          <BannerSection currentLang={currentLang} />
          
          {/* 5. Cake Categories Section (Matching style of reference image with empty image slots) */}
          <CakeCategoriesSection 
            currentLang={currentLang}
            onSelectCategory={handleCategoryNavigation}
            onCustomizeClick={openCustomizePage}
          />

          {/* 6. Bestsellers Section (Our Favorites - 4 Featured Showcase Cards) */}
          <BestsellersSection
            currentLang={currentLang}
            onAddToCart={handleAddToCart}
            onCustomizeClick={openCustomizePage}
          />

          {/* 7. Best Cakes in Dubai Section (Signature Dubai Showcase, Trust Pillars & Refrigerated Delivery) */}
          <BestCakesInDubaiSection
            currentLang={currentLang}
            onAddToCart={handleAddToCart}
            onCustomizeClick={openCustomizePage}
          />

          {/* 8. Chef Saad Heritage Story Section (Strawberry Cream Cake Close-Up Background) */}
          <ChefStorySection currentLang={currentLang} />

          {/* 9. Client Stories & Reviews Section */}
          <ReviewsSection currentLang={currentLang} />
        </main>
      )}

      {/* 10. Luxury Bakery Footer Section */}
      <FooterSection 
        currentLang={currentLang} 
        onCustomizeClick={openCustomizePage}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectCategory={handleCategoryNavigation}
      />

      {/* Cake Customization Modal (Preserved existing builder functionality) */}
      <CustomizeCakeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        onAddToCart={handleAddToCart}
        currentLang={currentLang}
      />

      {/* Help Center Concierge Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFF9F0] rounded-2xl max-w-md w-full p-6 border border-[#F5EBDD] shadow-2xl relative text-[#4A2116]">
            <button 
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-[#8C6D62] hover:text-[#4A2116] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F8F1E6] border border-[#E6C783] flex items-center justify-center text-[#C58A19]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2116]">
                  {t.helpModalTitle}
                </h3>
                <p className="text-xs text-[#C58A19] font-medium">
                  {isAr ? 'الخدمة الفاخرة للاستفسارات والطلبات' : 'Luxury Cake Concierge & Orders'}
                </p>
              </div>
            </div>
            <p className="text-xs text-[#7D5B50] leading-relaxed mb-6">
              {t.helpModalDesc}
            </p>
            <div className="space-y-2.5 text-xs">
              <a 
                href="tel:+971506063631" 
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#F5EBDD] hover:border-[#C58A19] transition-colors font-medium"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C58A19]" />
                  <span>+971 506063631</span>
                </div>
                <span className="text-[#C58A19] font-semibold">{t.callUs}</span>
              </a>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#F5EBDD] text-[#7D5B50]">
                <Clock className="w-4 h-4 text-[#C58A19]" />
                <span>{isAr ? 'مفتوح يومياً: 8:00 صباحاً – 11:00 مساءً' : 'Open Daily: 8:00 AM – 11:00 PM'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Info Modal */}
      {isAccountOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFF9F0] rounded-2xl max-w-sm w-full p-6 border border-[#F5EBDD] shadow-2xl relative text-[#4A2116]">
            <button 
              onClick={() => setIsAccountOpen(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-[#8C6D62] hover:text-[#4A2116] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center py-2">
              <div className="w-12 h-12 rounded-full bg-[#F8F1E6] border border-[#E6C783] flex items-center justify-center text-[#C58A19] mx-auto mb-3">
                <UserRound className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#4A2116] mb-1">
                {isAr ? 'حساب العميل' : 'Client Account'}
              </h3>
              <p className="text-xs text-[#7D5B50] mb-5">
                {isAr ? 'سجل دخولك لتتبع طلبات الكيك المخصصة وحفظ تصاميمك' : 'Sign in to track custom cake orders and view saved celebration designs.'}
              </p>
              <button 
                onClick={() => {
                  setIsAccountOpen(false);
                  setToastMessage(isAr ? 'أهلاً بك في حسابك' : 'Welcome back!');
                }}
                className="w-full bg-[#C58A19] hover:bg-[#4A2116] text-white py-2.5 rounded-[20px] text-xs font-semibold shadow transition-colors cursor-pointer"
              >
                {isAr ? 'تسجيل الدخول / إنشاء حساب' : 'Sign In / Register'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bag / Cart Drawer Modal */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFF9F0] rounded-2xl max-w-sm w-full p-6 border border-[#F5EBDD] shadow-2xl relative text-[#4A2116]">
            <button 
              onClick={() => setIsBagOpen(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-[#8C6D62] hover:text-[#4A2116] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center py-2">
              <div className="w-12 h-12 rounded-full bg-[#F8F1E6] border border-[#E6C783] flex items-center justify-center text-[#C58A19] mx-auto mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#4A2116] mb-1">
                {isAr ? 'حقيبة المشتريات' : 'Your Shopping Bag'}
              </h3>
              <p className="text-xs text-[#7D5B50] mb-4">
                {isAr ? `لديك ${cartCount} عناصر في حقيبتك` : `You currently have ${cartCount} handcrafted items in your bag.`}
              </p>
              <div className="bg-white p-3 rounded-xl border border-[#F5EBDD] text-left rtl:text-right text-xs mb-5 space-y-1">
                <div className="font-semibold text-[#4A2116] flex justify-between">
                  <span>{isAr ? 'كيك الكراميل المقطر الفاخر' : 'Signature Caramel Drip Cake'}</span>
                  <span className="text-[#72251F]">AED 290</span>
                </div>
                <div className="text-[11px] text-[#8C6D62]">2kg • Vanilla Bean • 24K Gold Leaf</div>
              </div>
              <button 
                onClick={() => {
                  setIsBagOpen(false);
                  setIsCustomizeOpen(true);
                }}
                className="w-full bg-[#C58A19] hover:bg-[#4A2116] text-white py-2.5 rounded-[20px] text-xs font-semibold shadow transition-colors cursor-pointer"
              >
                {isAr ? 'إضافة تصميم كيك آخر' : 'Customize Another Cake'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
