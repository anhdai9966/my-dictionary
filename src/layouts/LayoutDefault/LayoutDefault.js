import { motion } from 'framer-motion';

function LayoutDefault({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{duration: .2, ease: 'easeOut'}}
            className="w-full max-w-4xl h-[var(--window-height)] mx-auto overflow-hidden"
        >
            <div className="w-full h-full px-3 pb-3 flex flex-col gap-4 relative">
                {children}
            </div>
        </motion.div>
    );
}

export default LayoutDefault;
