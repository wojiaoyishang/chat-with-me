import { memo } from 'react';

import ThreeDotLoading from '@/components/ui/ThreeDotLoading.jsx';

const QueuingBlock = memo(() => {
    return (
        <div className="w-full flex justify-start items-center py-2">
            <ThreeDotLoading/>
        </div>
    );
});

QueuingBlock.displayName = 'QueuingBlock';

export default QueuingBlock;
