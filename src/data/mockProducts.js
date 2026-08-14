function offsetDate(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

function purchaseDateFor(days) {
  const date = new Date()
  date.setDate(date.getDate() + days - 120)
  return date.toISOString().slice(0, 10)
}

const catalog = [
  { name: 'Paracetamol 500mg', category: 'Medicine', supplier: 'MedPlus Distributors', description: 'Pain relief and fever reducer tablets, box of 100.' },
  { name: 'Amoxicillin 250mg', category: 'Medicine', supplier: 'PharmaCore Ltd', description: 'Broad-spectrum antibiotic capsules.' },
  { name: 'Vitamin C 1000mg', category: 'Medicine', supplier: 'Wellness Supply Co', description: 'Immune support effervescent tablets.' },
  { name: 'Ibuprofen 400mg', category: 'Medicine', supplier: 'MedPlus Distributors', description: 'Anti-inflammatory pain relief tablets.' },
  { name: 'Cough Syrup 100ml', category: 'Medicine', supplier: 'PharmaCore Ltd', description: 'Relief from dry and chesty cough.' },
  { name: 'Antacid Suspension', category: 'Medicine', supplier: 'Wellness Supply Co', description: 'Fast relief from heartburn and indigestion.' },
  { name: 'Milo 400g', category: 'Food', supplier: 'Northgate Foods', description: 'Chocolate malt beverage powder.' },
  { name: 'Peak Milk 400g', category: 'Food', supplier: 'Northgate Foods', description: 'Full cream evaporated milk tin.' },
  { name: 'Indomie Noodles Carton', category: 'Food', supplier: 'Crestline Wholesale', description: 'Instant noodles, chicken flavour, carton of 40.' },
  { name: 'Golden Penny Spaghetti', category: 'Food', supplier: 'Crestline Wholesale', description: 'Durum wheat spaghetti, 500g pack.' },
  { name: 'Basmati Rice 5kg', category: 'Food', supplier: 'Northgate Foods', description: 'Long grain aromatic rice.' },
  { name: 'Vegetable Oil 5L', category: 'Food', supplier: 'Crestline Wholesale', description: 'Refined cooking oil.' },
  { name: 'Brown Bread Loaf', category: 'Food', supplier: 'Local Bakery Hub', description: 'Freshly baked whole wheat bread.' },
  { name: 'Fresh Eggs Crate', category: 'Food', supplier: 'Local Bakery Hub', description: 'Crate of 30 farm eggs.' },
  { name: 'Coca-Cola 50cl (Pack)', category: 'Beverages', supplier: 'Crestline Wholesale', description: 'Carbonated soft drink, pack of 12.' },
  { name: 'Bottled Water 75cl (Pack)', category: 'Beverages', supplier: 'Northgate Foods', description: 'Purified drinking water, pack of 12.' },
  { name: 'Orange Juice 1L', category: 'Beverages', supplier: 'Northgate Foods', description: 'Chilled 100% orange juice.' },
  { name: 'Energy Drink 33cl (Pack)', category: 'Beverages', supplier: 'Crestline Wholesale', description: 'Carbonated energy drink, pack of 24.' },
  { name: 'Instant Coffee 200g', category: 'Beverages', supplier: 'Northgate Foods', description: 'Rich roasted instant coffee jar.' },
  { name: 'Dettol Antiseptic 250ml', category: 'Household', supplier: 'CleanCare Supplies', description: 'Antiseptic disinfectant liquid.' },
  { name: 'Hand Sanitizer 500ml', category: 'Household', supplier: 'CleanCare Supplies', description: '70% alcohol hand sanitizer gel.' },
  { name: 'Bleach 1L', category: 'Household', supplier: 'CleanCare Supplies', description: 'Multi-surface disinfecting bleach.' },
  { name: 'Air Freshener Spray', category: 'Household', supplier: 'CleanCare Supplies', description: 'Long-lasting room air freshener.' },
  { name: 'Dishwashing Liquid 750ml', category: 'Household', supplier: 'CleanCare Supplies', description: 'Grease-cutting dish soap.' },
  { name: 'Nivea Body Lotion 400ml', category: 'Cosmetics', supplier: 'GlowLine Cosmetics', description: 'Moisturising body lotion.' },
  { name: 'Toothpaste 150g', category: 'Cosmetics', supplier: 'GlowLine Cosmetics', description: 'Cavity protection fluoride toothpaste.' },
  { name: 'Shea Butter Cream 200g', category: 'Cosmetics', supplier: 'GlowLine Cosmetics', description: 'Natural moisturising shea butter cream.' },
  { name: 'Sunscreen SPF50 100ml', category: 'Cosmetics', supplier: 'GlowLine Cosmetics', description: 'Broad spectrum sun protection lotion.' },
  { name: 'Facial Cleanser 150ml', category: 'Cosmetics', supplier: 'GlowLine Cosmetics', description: 'Gentle daily facial cleanser.' },
  { name: 'AA Batteries (Pack of 4)', category: 'Electronics', supplier: 'CircuitPoint Ltd', description: 'Alkaline batteries, pack of 4.' },
  { name: 'USB Power Bank 10000mAh', category: 'Electronics', supplier: 'CircuitPoint Ltd', description: 'Portable charging power bank.' },
  { name: 'LED Bulb 9W', category: 'Electronics', supplier: 'CircuitPoint Ltd', description: 'Energy-saving LED light bulb.' },
  { name: 'Extension Socket 4-Way', category: 'Electronics', supplier: 'CircuitPoint Ltd', description: '4-way surge protected extension socket.' },
  { name: 'Insect Repellent Spray', category: 'Other', supplier: 'Wellness Supply Co', description: 'Outdoor insect and mosquito repellent.' },
  { name: 'Baby Diapers (Pack)', category: 'Other', supplier: 'Wellness Supply Co', description: 'Size 3 diapers, pack of 40.' }
]

const daysOffsets = [
  120, 95, 80, 60, 45, 33,
  28, 22, 18, 12,
  6, 5, 4, 2, 1,
  0,
  -1, -3, -5, -9, -14, -21,
  75, 40, 15, 10, 3,
  55, 25, 8, -2,
  90, 19, -7, 41
]

export const mockProducts = catalog.map((item, index) => {
  const offset = daysOffsets[index % daysOffsets.length]
  const batch = `${item.category.slice(0, 2).toUpperCase()}${String(index + 1).padStart(3, '0')}`
  return {
    id: `prod-${index + 1}`,
    name: item.name,
    category: item.category,
    batchNumber: batch,
    quantity: 10 + ((index * 7) % 90),
    purchaseDate: purchaseDateFor(offset),
    expiryDate: offsetDate(offset),
    supplier: item.supplier,
    description: item.description,
    createdAt: purchaseDateFor(offset)
  }
})
