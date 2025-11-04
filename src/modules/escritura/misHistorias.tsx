"use client";
import React from "react";
import styles from "./styles/misHistorias.module.css";
import { motion } from "framer-motion";
import { Edit, Eye, Trash } from "lucide-react";

const MisHistorias = () => {
  const historias = [
    {
      id: 1,
      titulo: "Sombras del Castillo",
      genero: "Fantasia",
      estado: "En curso",
      fecha: "03/11/2025",
    },
    {
      id: 2,
      titulo: "Ecos del Silencio",
      genero: "Drama",
      estado: "Finalizada",
      fecha: "20/10/2025",
    },
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Mis Historias</h1>

      <section className={styles.grid}>
        {historias.map((historia, index) => (
          <motion.div
            key={historia.id}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className={styles.cardHeader}>
              <h2>{historia.titulo}</h2>
              <span className={styles.badge}>{historia.estado}</span>
            </div>
            <p><strong>Género:</strong> {historia.genero}</p>
            <p><strong>Creado:</strong> {historia.fecha}</p>

            <div className={styles.actions}>
              <button className={`${styles.btn} ${styles.view}`}>
                <Eye size={18} /> Ver
              </button>
              <button className={`${styles.btn} ${styles.edit}`}>
                <Edit size={18} /> Editar
              </button>
              <button className={`${styles.btn} ${styles.delete}`}>
                <Trash size={18} /> Eliminar
              </button>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
};

export default MisHistorias;
