'use client';
import React, { useMemo } from 'react';
import { Button } from '@/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import PostCreateModal from '@/components/pages/home/PostCreateModal';
import { FilterDirection, NewPost, PostDocument } from '@/lib/firebase/types';
import { useDisclosure } from '@/lib/hooks/util';
import { useAppSelector } from '@/lib/redux';
import { FiltersPayload } from '@/lib/redux/features/posts/postsSlice';

type FilterLabel = {
  label: string;
  filters: {
    orderBy: keyof PostDocument;
    direction: FilterDirection;
  };
};

const filterLabels: FilterLabel[] = [
  {
    label: 'Date ↑',
    filters: {
      orderBy: 'created_at',
      direction: FilterDirection.Ascending,
    },
  },
  {
    label: 'Date ↓',
    filters: {
      orderBy: 'created_at',
      direction: FilterDirection.Descending,
    },
  },
  {
    label: 'Comments ↑',
    filters: {
      orderBy: 'user_comments',
      direction: FilterDirection.Ascending,
    },
  },
  {
    label: 'Comments ↓',
    filters: {
      orderBy: 'user_comments',
      direction: FilterDirection.Descending,
    },
  },
  {
    label: 'Author ↑',
    filters: {
      orderBy: 'author',
      direction: FilterDirection.Ascending,
    },
  },
  {
    label: 'Author ↓',
    filters: {
      orderBy: 'author',
      direction: FilterDirection.Descending,
    },
  },
];

interface PostsActionsBarProps {
  onPostCreate: (payload: NewPost) => void;
  onFilterChange: (payload: FiltersPayload) => void;
  creationModalControls: ReturnType<typeof useDisclosure>;
}

const PostsActionsBar: React.FC<PostsActionsBarProps> = ({
  onPostCreate,
  creationModalControls,
  onFilterChange,
}) => {
  const filters = useAppSelector((state) => state.posts.filters);

  const selectedFilter = useMemo(() => {
    return filterLabels.filter(
      (value) =>
        filters.orderBy === value.filters.orderBy && filters.direction === value.filters.direction,
    )[0];
  }, [filters]);

  return (
    <>
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <Button onClick={creationModalControls.onOpen}>Create Post</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sort by: {selectedFilter?.label}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            {filterLabels.map((filter, index) => (
              <DropdownMenuItem key={index} onClick={() => onFilterChange(filter.filters)}>
                {filter.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <PostCreateModal
        isOpen={creationModalControls.isOpen}
        onOpenChange={creationModalControls.onChange}
        onSubmit={onPostCreate}
      />
    </>
  );
};

export default PostsActionsBar;
