import { readFile } from 'node:fs/promises';
import type { Favorite, FavoritesByCategory } from 'shared/dist';

/**
 * Lê e indexa favoritos do arquivo JSON
 */
export async function indexFavorites(favoritesPath: string): Promise<{
  favorites: Favorite[];
  favoritesByCategory: FavoritesByCategory;
  categories: string[];
}> {
  try {
    const content = await readFile(favoritesPath, 'utf-8');
    const data = JSON.parse(content);
    
    const favorites: Favorite[] = data.favorites || [];
    
    // Ordena favoritos por título
    favorites.sort((a, b) => a.title.localeCompare(b.title));
    
    // Agrupa favoritos por categoria
    const favoritesByCategory: FavoritesByCategory = {};
    const categoriesSet = new Set<string>();
    
    favorites.forEach(favorite => {
      const category = favorite.category || 'Outros';
      categoriesSet.add(category);
      
      if (!favoritesByCategory[category]) {
        favoritesByCategory[category] = [];
      }
      
      favoritesByCategory[category].push(favorite);
    });
    
    const categories = Array.from(categoriesSet).sort();
    
    return { favorites, favoritesByCategory, categories };
  } catch (error) {
    console.error('Error indexing favorites:', error);
    return { favorites: [], favoritesByCategory: {}, categories: [] };
  }
}

/**
 * Busca um favorito específico pelo ID
 */
export async function getFavoriteById(favoritesPath: string, id: string): Promise<Favorite | null> {
  try {
    const { favorites } = await indexFavorites(favoritesPath);
    return favorites.find(fav => fav.id === id) || null;
  } catch (error) {
    console.error('Error getting favorite by id:', error);
    return null;
  }
}