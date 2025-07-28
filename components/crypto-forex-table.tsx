"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { translations, type Locale } from "@/lib/translations";

type AssetData = {
  asset: string;
  price: number;
  change: number;
  icon?: string;
};

interface CryptoForexTableProps {
  locale: Locale;
}

export function CryptoForexTable({ locale }: CryptoForexTableProps) {
  const [data, setData] = useState<AssetData[]>([]);
  const [mode, setMode] = useState<"crypto" | "forex">("crypto");
  const [error, setError] = useState<string | null>(null);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<Date | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Add fallback handling for translations
  const t = translations[locale] ||
    translations["en"] || {
      marketTracker: {
        title: "Live Market Tracker",
        subtitle: "Real-time {mode} market data",
        cryptoMode: "Cryptocurrency",
        forexMode: "Forex",
        cryptoButton: "Crypto",
        forexButton: "Forex",
        cryptoMarket: "Cryptocurrency Market",
        forexMarket: "Forex Market",
        loading: "Loading market data...",
        refresh: "Refresh",
        lastUpdate: "Last updated:",
        tableHeaders: {
          asset: "Asset",
          price: "Price",
          change: "24h Change",
        },
        dataProviders: {
          crypto: "Data provided by Coinbase",
          forex: "Data provided by ExchangeRate-API",
        },
      },
    };

  // Add debug logging to help identify the issue
  if (typeof window !== "undefined") {
    console.log("CryptoForexTable - Current locale:", locale);
    console.log(
      "CryptoForexTable - Translation for locale:",
      translations[locale]
    );
    console.log(
      "CryptoForexTable - t.marketTracker exists:",
      !!t.marketTracker
    );
  }

  // Crypto assets configuration
  const cryptoAssets = [
    { id: "BTC", name: "BTC/USD", icon: "btc.svg" },
    { id: "ETH", name: "ETH/USD", icon: "eth.svg" },
    { id: "SOL", name: "SOL/USD", icon: "sol.svg" },
    { id: "XRP", name: "XRP/USD", icon: "xrp.svg" },
    { id: "BNB", name: "BNB/USD", icon: "bnb.svg" },
    { id: "DOGE", name: "DOGE/USD", icon: "doge.svg" },
  ];

  // Forex pairs configuration
  const forexPairs = [
    { pair: "EURUSD", name: "EUR/USD", icon: "eur.png" },
    { pair: "GBPUSD", name: "GBP/USD", icon: "gbp.png" },
    { pair: "USDJPY", name: "USD/JPY", icon: "jpy.png" },
    { pair: "AUDUSD", name: "AUD/USD", icon: "aud.png" },
    { pair: "USDCAD", name: "USD/CAD", icon: "cad.png" },
    { pair: "USDCHF", name: "USD/CHF", icon: "chf.png" },
  ];

  // Fetch crypto data from reliable API
  const fetchCryptoData = async (): Promise<AssetData[]> => {
    try {
      const res = await fetch(
        `https://api.coinbase.com/v2/exchange-rates?currency=USD`
      );

      if (!res.ok) throw new Error("Failed to fetch crypto data");

      const json = await res.json();
      const rates = json.data.rates;

      return cryptoAssets.map((asset) => {
        const rate = rates[asset.id];
        const price = rate ? 1 / Number.parseFloat(rate) : 0;

        // Simulate price change for demo (in real app, use historical data)
        const change = (Math.random() - 0.5) * 10;

        return {
          asset: asset.name,
          price,
          change,
          icon: `/icons/${asset.icon}`,
        };
      });
    } catch (err) {
      console.error("Crypto fetch failed:", err);
      throw new Error("Failed to load crypto data");
    }
  };

  // Fetch forex data from reliable API
  const fetchForexData = async (): Promise<AssetData[]> => {
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);

      if (!res.ok) throw new Error("Failed to fetch forex data");

      const json = await res.json();
      const rates = json.rates;

      return forexPairs.map((pair) => {
        let price = 0;

        // Handle direct and inverse pairs
        if (pair.pair.startsWith("USD")) {
          const currency = pair.pair.slice(3);
          price = rates[currency] || 0;
        } else {
          const currency = pair.pair.slice(0, 3);
          price = rates[currency] ? 1 / rates[currency] : 0;
        }

        // Simulate price change for demo (in real app, use historical data)
        const change = (Math.random() - 0.5) * 2;

        return {
          asset: pair.name,
          price,
          change,
          icon: `/flags/${pair.icon}`,
        };
      });
    } catch (err) {
      console.error("Forex fetch failed:", err);
      throw new Error("Failed to load forex data");
    }
  };

  // Update data based on current mode (quietly in background)
  const updateData = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsManualRefreshing(true);
    }

    try {
      const newData =
        mode === "crypto" ? await fetchCryptoData() : await fetchForexData();

      // Smoothly update numbers without full reload
      setData((prevData) => {
        return newData.map((newItem, index) => {
          const prevItem = prevData[index] || newItem;
          return {
            ...newItem,
            // Preserve previous values during animation
            price: prevItem.price,
            change: prevItem.change,
          };
        });
      });

      // Animate number changes after a short delay
      setTimeout(() => {
        setData(newData);
        lastUpdateRef.current = new Date();
      }, 50);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      if (isManualRefresh) {
        setIsManualRefreshing(false);
      }
    }
  };

  // Initialize data fetching
  useEffect(() => {
    updateData(); // Initial fetch

    // Set up background polling
    intervalRef.current = setInterval(() => {
      updateData();
    }, 15000); // Update every 15 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mode]);

  // Remove scrollbar on hover
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const handleMouseEnter = () => {
      table.classList.add("hide-scrollbar");
    };

    const handleMouseLeave = () => {
      table.classList.remove("hide-scrollbar");
    };

    table.addEventListener("mouseenter", handleMouseEnter);
    table.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      table.removeEventListener("mouseenter", handleMouseEnter);
      table.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const getModeText = () => {
    return mode === "crypto"
      ? t.marketTracker.cryptoMode
      : t.marketTracker.forexMode;
  };

  return (
    <section className="bg-gradient-to-r from-[#000a12] to-[#02141f] py-10">
      <div className="bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 mt-8 rounded-3xl shadow-2xl border border-gray-800 text-white max-w-5xl sm:max-w-6xl mx-auto">
        <div className="relative z-10 mb-4 sm:mb-6 text-center px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-1 sm:mb-2 bg-gradient-to-r from-cyan-400 to-indigo-500 text-transparent bg-clip-text">
            {t.marketTracker.title}
          </h1>
          <p className="text-sm sm:text-md md:text-lg text-gray-400">
            {t.marketTracker.subtitle.replace("{mode}", getModeText())}
          </p>

          <div className="mt-3 sm:mt-4 mb-2 sm:mb-4 flex justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setMode("crypto")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all ${
                mode === "crypto"
                  ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white border-transparent shadow-lg shadow-cyan-500/20"
                  : "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700"
              } text-sm sm:text-base`}
            >
              {t.marketTracker.cryptoButton}
            </button>
            <button
              onClick={() => setMode("forex")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all ${
                mode === "forex"
                  ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white border-transparent shadow-lg shadow-cyan-500/20"
                  : "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700"
              } text-sm sm:text-base`}
            >
              {t.marketTracker.forexButton}
            </button>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl mt-1 sm:mt-2 font-semibold tracking-wide text-cyan-400">
            {mode === "crypto"
              ? t.marketTracker.cryptoMarket
              : t.marketTracker.forexMarket}
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-2 sm:p-3 bg-red-900/50 text-red-300 rounded-lg text-center text-sm sm:text-base">
            {error}
          </div>
        )}

        <div
          ref={tableRef}
          className="overflow-x-auto hide-scrollbar-on-hover transition-all"
        >
          <table className="w-full text-left border-separate border-spacing-y-2 sm:border-spacing-y-3">
            <thead>
              <tr className="text-gray-500 text-xs sm:text-sm uppercase">
                <th className="px-2 sm:px-4 py-2">
                  {t.marketTracker.tableHeaders.asset}
                </th>
                <th className="px-2 sm:px-4 py-2">
                  {t.marketTracker.tableHeaders.price}
                </th>
                <th className="px-2 sm:px-4 py-2">
                  {t.marketTracker.tableHeaders.change}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 sm:py-8">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin text-cyan-400" />
                      <span className="text-sm sm:text-base">
                        {t.marketTracker.loading}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((item, i) => {
                  const isUp = item.change >= 0;
                  return (
                    <tr
                      key={i}
                      className="bg-gray-800/60 backdrop-blur-sm hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <td className="py-2 sm:py-4 px-2 sm:px-4 font-medium text-white flex items-center gap-2 sm:gap-3 rounded-l-xl">
                        {item.icon && (
                          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center">
                            <img
                              src={item.icon || "/placeholder.svg"}
                              alt={item.asset}
                              className="w-6 h-4 sm:w-9 sm:h-6 object-contain"
                            />
                          </div>
                        )}
                        <span className="font-bold text-sm sm:text-base">
                          {item.asset}
                        </span>
                      </td>
                      <td className="py-2 sm:py-4 px-2 sm:px-4 text-base sm:text-lg font-semibold transition-all duration-500 ease-in-out">
                        {typeof item.price === "number"
                          ? mode === "crypto"
                            ? `$${item.price.toLocaleString(undefined, {
                                minimumFractionDigits: item.price < 1 ? 4 : 2,
                                maximumFractionDigits: item.price < 1 ? 6 : 2,
                              })}`
                            : item.price.toLocaleString(undefined, {
                                minimumFractionDigits: 4,
                                maximumFractionDigits: 6,
                              })
                          : "—"}
                      </td>
                      <td
                        className={`py-2 sm:py-4 px-2 sm:px-4 flex items-center gap-1 font-bold rounded-r-xl transition-all duration-500 ease-in-out ${
                          isUp ? "text-green-400" : "text-red-400"
                        } text-sm sm:text-base`}
                      >
                        {isUp ? (
                          <ArrowUpRight size={16} />
                        ) : (
                          <ArrowDownRight size={16} />
                        )}
                        <span>
                          {typeof item.change === "number" &&
                          !isNaN(item.change)
                            ? `${isUp ? "+" : ""}${item.change.toFixed(2)}%`
                            : "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500 px-2 sm:px-0 space-y-2 sm:space-y-0">
          <div>
            <p>
              {mode === "crypto"
                ? t.marketTracker.dataProviders.crypto
                : t.marketTracker.dataProviders.forex}
            </p>
            <p className="mt-1">
              {t.marketTracker.lastUpdate}{" "}
              {lastUpdateRef.current
                ? lastUpdateRef.current.toLocaleTimeString()
                : "N/A"}
            </p>
          </div>
          <button
            onClick={() => updateData(true)}
            disabled={isManualRefreshing}
            className="mt-1 sm:mt-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            {isManualRefreshing ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <ArrowUpRight size={14} />
            )}
            <span>{t.marketTracker.refresh}</span>
          </button>
        </div>

        <style jsx>{`
          .hide-scrollbar-on-hover::-webkit-scrollbar {
            height: 6px;
            background-color: transparent;
          }

          .hide-scrollbar-on-hover::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.3);
            border-radius: 3px;
          }

          .hide-scrollbar-on-hover:hover::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.5);
          }

          .hide-scrollbar {
            scrollbar-width: none;
          }

          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
