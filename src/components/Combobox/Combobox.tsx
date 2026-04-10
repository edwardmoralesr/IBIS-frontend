import { useState, useRef, useEffect } from "react";
import "./Combobox.css";

type Option<T> = {
    label: string;
    value: T;
};

type SelectProps<T extends string | number> = {
    label?: string;
    options: Option<T>[];
    value?: T;
    onChange?: (value: T) => void;
    placeholder?: string;
    searchable?: boolean;
};

export default function Select<T extends string | number>({
    label,
    options,
    value,
    onChange,
    placeholder = "Seleccionar...",
    searchable = true
}: SelectProps<T>) {

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find(o => o.value === value);

    // cerrar al hacer click afuera
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    const filtered = options.filter(o =>
        o.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="select-wrapper" ref={ref}>

            {label && <label className="select-label">{label}</label>}

            <div className="select-input" onClick={() => setOpen(!open)}>
                {selected ? selected.label : placeholder}
                <span className="arrow">▾</span>
            </div>

            {open && (
                <div className="select-dropdown">

                    {searchable && (
                        <input
                            className="select-search"
                            placeholder="Buscar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    )}

                    <div className="select-options">
                        {filtered.map(option => (
                            <div
                                key={option.value}
                                className="select-option"
                                onClick={() => {
                                    onChange?.(option.value);
                                    setOpen(false);
                                    setSearch("");
                                }}
                            >
                                {option.label}
                            </div>
                        ))}

                        {filtered.length === 0 && (
                            <div className="select-empty">Sin resultados</div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}