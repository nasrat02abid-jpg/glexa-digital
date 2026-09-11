"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Edit3,
  ExternalLink,
  ImagePlus,
  LoaderCircle,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import {
  deletePortfolioProject,
  getPortfolioProjects,
  savePortfolioProject,
} from "@/lib/admin-api";
import type { PortfolioProject } from "@/lib/admin-api";
import { portfolioImageUrl } from "@/lib/portfolio-api";

import styles from "./PortfolioManager.module.css";

type Props = {
  onCountChange?: (count: number) => void;
};

export default function PortfolioManager({
  onCountChange,
}: Props) {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [editing, setEditing] =
    useState<PortfolioProject | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setError("");

      const data = await getPortfolioProjects();

      setProjects(data);
      onCountChange?.(data.length);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load portfolio."
      );
    }
  }, [onCountChange]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
    setError("");
  };

  const openEdit = (project: PortfolioProject) => {
    setEditing(project);
    setShowForm(true);
    setError("");
  };

  const closeForm = () => {
    if (busy) {
      return;
    }

    setShowForm(false);
    setEditing(null);
    setError("");
  };

  const submit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  // When editing without selecting a new image,
  // remove the empty File so the current image is preserved.
  const image = formData.get("image");

  if (image instanceof File && image.size === 0) {
    formData.delete("image");
  }

  // Always send explicit checkbox values.
  formData.set(
    "is_published",
    formData.has("is_published") ? "true" : "false"
  );

  formData.set(
    "is_featured",
    formData.has("is_featured") ? "true" : "false"
  );

  setBusy(true);
  setError("");

  try {
    await savePortfolioProject(
      formData,
      editing?.id
    );

    setShowForm(false);
    setEditing(null);

    await load();
  } catch (saveError) {
    setError(
      saveError instanceof Error
        ? saveError.message
        : "Unable to save project."
    );
  } finally {
    setBusy(false);
  }
};

  const remove = async (
    project: PortfolioProject
  ) => {
    const confirmed = window.confirm(
      `Delete “${project.title}”? This will also remove its image.`
    );

    if (!confirmed) {
      return;
    }

    setError("");

    try {
      await deletePortfolioProject(project.id);
      await load();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete project."
      );
    }
  };

  return (
    <div className={styles.manager}>
      <div className={styles.toolbar}>
        <div>
          <h2>Portfolio Projects</h2>
          <p>
            Add, edit, publish and feature your work.
          </p>
        </div>

        <button type="button" onClick={openCreate}>
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {showForm && (
        <div className={styles.modalBackdrop}>
          <form
            className={styles.form}
            onSubmit={submit}
          >
            <div className={styles.formHeader}>
              <h3>
                {editing
                  ? "Edit Project"
                  : "New Portfolio Project"}
              </h3>

              <button
                type="button"
                className={styles.iconButton}
                onClick={closeForm}
                aria-label="Close form"
                disabled={busy}
              >
                <X />
              </button>
            </div>

            <label>
              Project title

              <input
                name="title"
                required
                minLength={2}
                maxLength={180}
                defaultValue={editing?.title ?? ""}
              />
            </label>

            <label>
              Description

              <textarea
                name="description"
                required
                minLength={10}
                rows={5}
                defaultValue={editing?.description ?? ""}
              />
            </label>

            <div className={styles.twoColumns}>
              <label>
                Category

                <input
                  name="category"
                  required
                  maxLength={100}
                  placeholder="Web Development"
                  defaultValue={editing?.category ?? ""}
                />
              </label>

              <label>
                Display order

                <input
                  name="display_order"
                  type="number"
                  min={0}
                  defaultValue={editing?.display_order ?? 0}
                />
              </label>
            </div>

            <label>
              Services / technologies

              <input
                name="services"
                placeholder="Next.js, FastAPI, PostgreSQL"
                defaultValue={editing?.services ?? ""}
              />
            </label>

            <label>
              Website link

              <input
                name="project_url"
                type="url"
                placeholder="https://example.com"
                defaultValue={editing?.project_url ?? ""}
              />
            </label>

            <label className={styles.upload}>
              <ImagePlus size={22} />

              <span>
                Project image{" "}
                {editing
                  ? "(leave empty to keep the current image)"
                  : ""}
              </span>

              <input
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                required={!editing}
              />
            </label>

            <div className={styles.checks}>
              <label>
                <input
                  name="is_published"
                  type="checkbox"
                  value="true"
                  defaultChecked={
                    editing?.is_published ?? true
                  }
                />
                Published
              </label>

              <label>
                <input
                  name="is_featured"
                  type="checkbox"
                  value="true"
                  defaultChecked={
                    editing?.is_featured ?? false
                  }
                />
                Featured on home page
              </label>
            </div>

            <button
              type="submit"
              className={styles.save}
              disabled={busy}
            >
              {busy && (
                <LoaderCircle
                  className={styles.spin}
                  size={18}
                />
              )}

              {editing
                ? "Save Changes"
                : "Create Project"}
            </button>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {projects.map((project) => (
          <article
            key={project.id}
            className={styles.card}
          >
            <img
              src={portfolioImageUrl(project.image_url)}
              alt={project.title}
            />

            <div className={styles.cardBody}>
              <div className={styles.meta}>
                <span>{project.category}</span>

                <span>
                  {project.is_published
                    ? "Published"
                    : "Draft"}
                </span>
              </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className={styles.actions}>
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                    View
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => openEdit(project)}
                >
                  <Edit3 size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  className={styles.danger}
                  onClick={() => void remove(project)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}

        {!projects.length && (
          <div className={styles.empty}>
            <ImagePlus size={36} />

            <p>No portfolio projects yet.</p>

            <button
              type="button"
              onClick={openCreate}
            >
              Add your first project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}