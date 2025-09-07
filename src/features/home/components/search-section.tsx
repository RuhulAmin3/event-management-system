"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, RotateCcw } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "~/components/ui/select";
import SelectCategory from "~/components/select-category";
import useSearching from "../hook/use-searching";

const SearchSection = () => {

  const { handleReset, handleSearch, isPending, setCategory, setQuery, query, category } = useSearching();

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card p-6 lg:p-8">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 h-12 bg-background border-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full lg:w-48 h-12 bg-background">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectCategory label="All Categories" value="all" />
              </Select>

              {/* Buttons Wrapper */}
              <div className="flex gap-2">
                <Button size="lg" className="h-12 px-6" disabled={isPending} type="submit">
                  <Filter className="w-4 h-4 lg:mr-2" />
                  <span className="hidden lg:inline">Filter</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-12 px-6"
                  onClick={handleReset}
                  disabled={isPending}
                >
                  <RotateCcw className="w-4 h-4 lg:mr-2" />
                  <span className="hidden lg:inline">Reset</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;