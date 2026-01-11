import { Product } from './mockData';

const WISHLIST_KEY = 'danl_wishlist';

const getWishlistFromStorage = (): Product[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (wishlist: Product[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  } catch {
    console.error('Failed to save wishlist to localStorage');
  }
};

export const wishlistStore = {
  getWishlist: () => getWishlistFromStorage(),

  addItem: (product: Product) => {
    const wishlist = getWishlistFromStorage();
    const exists = wishlist.find((item) => item.id === product.id);
    if (!exists) {
      wishlist.push(product);
      saveWishlistToStorage(wishlist);
    }
  },

  removeItem: (productId: number) => {
    let wishlist = getWishlistFromStorage();
    wishlist = wishlist.filter((item) => item.id !== productId);
    saveWishlistToStorage(wishlist);
  },

  isInWishlist: (productId: number) => {
    const wishlist = getWishlistFromStorage();
    return wishlist.some((item) => item.id === productId);
  },

  toggleWishlist: (product: Product) => {
    if (wishlistStore.isInWishlist(product.id)) {
      wishlistStore.removeItem(product.id);
    } else {
      wishlistStore.addItem(product);
    }
  },

  getCount: () => {
    return getWishlistFromStorage().length;
  },

  clearWishlist: () => {
    saveWishlistToStorage([]);
  },
};
