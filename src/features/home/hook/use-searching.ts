import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const useSearching = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize with URL values
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Build new query string
    const params = new URLSearchParams();

    if (query) params.set("q", query);
    if (category && category !== "all") params.set("category", category);

    startTransition(() => {
      router.push(`/?${params.toString()}`, { scroll: false });
    });
  };

  const handleReset = () => {
    setQuery("");
    setCategory("all");
    startTransition(() => {
      router.push("/", { scroll: false });
    });
  };

  return {
    handleReset,
    handleSearch,
    isPending,
    query,
    setQuery,
    category,
    setCategory,
  };
};

export default useSearching;
