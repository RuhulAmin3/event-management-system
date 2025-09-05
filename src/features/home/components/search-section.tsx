import { Input } from "~/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Button } from "~/components/ui/button";
import SelectCategory from "~/components/select-category";

const SearchSection = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search events..." 
                  className="pl-10 h-12 bg-background border-input"
                />
              </div>

              {/* Category Filter */}
              <Select>
                <SelectTrigger className="w-full lg:w-48 h-12 bg-background">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                 <SelectCategory/>
              </Select>

              {/* Filter Button */}
              <Button size="lg" className="h-12 px-6">
                <Filter className="w-4 h-4 lg:mr-2" />
                <span className="hidden lg:inline">Filter</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;