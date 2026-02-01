import { useState, useEffect } from 'react'

interface Token {
  rank: number
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  logo: string
  color: string
}

const mockTokens: Token[] = [
  { rank: 1, name: "Ethereum", symbol: "ETH", price: 3245.67, change24h: 2.34, marketCap: 389000000000, volume24h: 12500000000, logo: "⟠", color: "#627EEA" },
  { rank: 2, name: "USD Coin", symbol: "USDC", price: 1.00, change24h: 0.01, marketCap: 28000000000, volume24h: 5600000000, logo: "◉", color: "#2775CA" },
  { rank: 3, name: "Aerodrome", symbol: "AERO", price: 1.23, change24h: 8.45, marketCap: 890000000, volume24h: 78000000, logo: "✈", color: "#0052FF" },
  { rank: 4, name: "Brett", symbol: "BRETT", price: 0.1234, change24h: -3.21, marketCap: 1200000000, volume24h: 89000000, logo: "🐸", color: "#4ADE80" },
  { rank: 5, name: "Degen", symbol: "DEGEN", price: 0.0089, change24h: 15.67, marketCap: 340000000, volume24h: 45000000, logo: "🎩", color: "#A855F7" },
  { rank: 6, name: "Toshi", symbol: "TOSHI", price: 0.00045, change24h: -5.43, marketCap: 180000000, volume24h: 23000000, logo: "🐱", color: "#F97316" },
  { rank: 7, name: "Based", symbol: "BASED", price: 0.0234, change24h: 4.56, marketCap: 156000000, volume24h: 18000000, logo: "🔵", color: "#0052FF" },
  { rank: 8, name: "Mochi", symbol: "MOCHI", price: 0.0067, change24h: -1.23, marketCap: 120000000, volume24h: 15000000, logo: "🍡", color: "#EC4899" },
  { rank: 9, name: "Higher", symbol: "HIGHER", price: 0.0456, change24h: 12.34, marketCap: 98000000, volume24h: 12000000, logo: "⬆", color: "#22D3EE" },
  { rank: 10, name: "Normie", symbol: "NORMIE", price: 0.0023, change24h: -8.76, marketCap: 67000000, volume24h: 8900000, logo: "😐", color: "#A3A3A3" },
  { rank: 11, name: "Virtual", symbol: "VIRTUAL", price: 2.89, change24h: 6.78, marketCap: 890000000, volume24h: 67000000, logo: "◈", color: "#8B5CF6" },
  { rank: 12, name: "Basenji", symbol: "BENJI", price: 0.00012, change24h: 23.45, marketCap: 45000000, volume24h: 5600000, logo: "🐕", color: "#EAB308" },
]

function formatNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
  return `$${num.toFixed(2)}`
}

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (price >= 1) return `$${price.toFixed(2)}`
  if (price >= 0.01) return `$${price.toFixed(4)}`
  return `$${price.toFixed(6)}`
}

function TokenRow({ token, index }: { token: Token; index: number }) {
  const isPositive = token.change24h >= 0
  
  return (
    <div 
      className="glass rounded-xl p-4 md:p-5 card-hover animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Rank & Token Info */}
        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
          <span className="text-xs font-mono text-gray-500 w-6 text-center">#{token.rank}</span>
          <div 
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl md:text-2xl flex-shrink-0"
            style={{ background: `${token.color}20`, boxShadow: `0 0 20px ${token.color}30` }}
          >
            {token.logo}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate">{token.name}</h3>
            <span className="text-sm text-gray-400 font-mono">{token.symbol}</span>
          </div>
        </div>
        
        {/* Price & Change */}
        <div className="text-right flex-shrink-0">
          <p className="font-mono font-semibold text-white">{formatPrice(token.price)}</p>
          <p className={`font-mono text-sm ${isPositive ? 'text-[#00FF88]' : 'text-[#FF3366]'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(token.change24h).toFixed(2)}%
          </p>
        </div>
        
        {/* Market Cap & Volume - Hidden on mobile */}
        <div className="hidden lg:block text-right w-32">
          <p className="font-mono text-sm text-gray-300">{formatNumber(token.marketCap)}</p>
          <p className="text-xs text-gray-500">Market Cap</p>
        </div>
        
        <div className="hidden lg:block text-right w-32">
          <p className="font-mono text-sm text-gray-300">{formatNumber(token.volume24h)}</p>
          <p className="text-xs text-gray-500">24h Volume</p>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ label, value, subvalue }: { label: string; value: string; subvalue?: string }) {
  return (
    <div className="glass rounded-2xl p-5 md:p-6 card-hover">
      <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl md:text-3xl font-bold gradient-text font-mono">{value}</p>
      {subvalue && <p className="text-xs text-gray-500 mt-1">{subvalue}</p>}
    </div>
  )
}

export default function App() {
  const [tokens] = useState<Token[]>(mockTokens)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'change' | 'marketCap'>('rank')
  
  const filteredTokens = tokens
    .filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.price - a.price
        case 'change': return b.change24h - a.change24h
        case 'marketCap': return b.marketCap - a.marketCap
        default: return a.rank - b.rank
      }
    })

  const totalMarketCap = tokens.reduce((acc, t) => acc + t.marketCap, 0)
  const totalVolume = tokens.reduce((acc, t) => acc + t.volume24h, 0)
  const avgChange = tokens.reduce((acc, t) => acc + t.change24h, 0) / tokens.length
  
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full animate-float opacity-30"
          style={{ 
            background: 'radial-gradient(circle, rgba(0,82,255,0.4) 0%, transparent 70%)',
            top: '-200px',
            right: '-100px',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full animate-float-delayed opacity-20"
          style={{ 
            background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)',
            bottom: '-150px',
            left: '-100px',
          }}
        />
        <div 
          className="absolute w-[300px] h-[300px] rounded-full animate-float opacity-10"
          style={{ 
            background: 'radial-gradient(circle, rgba(0,255,136,0.4) 0%, transparent 70%)',
            top: '50%',
            left: '30%',
            animationDelay: '-10s',
          }}
        />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#0052FF] flex items-center justify-center">
                  <svg viewBox="0 0 32 32" className="w-6 h-6 md:w-7 md:h-7" fill="white">
                    <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M12 16h8M16 12v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  <span className="gradient-text">Base</span> Tokens
                </h1>
              </div>
              <p className="text-gray-400 text-sm md:text-base">Top tokens on Base blockchain by market cap</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="live-dot"></div>
              <span className="text-sm text-gray-400 font-mono">
                {time.toLocaleTimeString('en-US', { hour12: false })} UTC
              </span>
            </div>
          </div>
        </header>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          <StatsCard label="Total Market Cap" value={formatNumber(totalMarketCap)} />
          <StatsCard label="24h Volume" value={formatNumber(totalVolume)} />
          <StatsCard 
            label="Avg 24h Change" 
            value={`${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`}
          />
          <StatsCard label="Active Tokens" value={tokens.length.toString()} subvalue="Tracked on Base" />
        </div>
        
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
          <div className="relative flex-1">
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0052FF]/50 transition-all"
            />
          </div>
          
          <div className="flex gap-2">
            {(['rank', 'price', 'change', 'marketCap'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  sortBy === option 
                    ? 'bg-[#0052FF] text-white' 
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {option === 'marketCap' ? 'MCap' : option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Token List */}
        <div className="space-y-3">
          {/* Column Headers - Desktop */}
          <div className="hidden lg:flex items-center gap-4 px-5 py-2 text-xs text-gray-500 uppercase tracking-wider">
            <div className="flex items-center gap-4 flex-1">
              <span className="w-6 text-center">#</span>
              <span className="w-12"></span>
              <span>Token</span>
            </div>
            <span className="w-24 text-right">Price</span>
            <span className="w-32 text-right">Market Cap</span>
            <span className="w-32 text-right">24h Volume</span>
          </div>
          
          {filteredTokens.map((token, index) => (
            <TokenRow key={token.symbol} token={token} index={index} />
          ))}
          
          {filteredTokens.length === 0 && (
            <div className="glass rounded-xl p-12 text-center">
              <p className="text-gray-400">No tokens found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
        
        {/* Info Banner */}
        <div className="mt-10 glass rounded-2xl p-6 animate-shimmer">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#0052FF]/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#0052FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">About Base</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain. 
                Incubated by Coinbase, it offers a seamless way to access the Ethereum ecosystem with lower fees and faster transactions.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-white/5">
          <p className="text-center text-xs text-gray-600">
            Requested by <a href="https://twitter.com/special_kkel" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">@special_kkel</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">@clonkbot</a>
          </p>
        </footer>
      </div>
    </div>
  )
}