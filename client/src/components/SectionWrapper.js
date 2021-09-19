import { Link } from 'react-router-dom';
import { Section } from '../styles';

const SectionWrapper = ({ children, title, seeAllLink, breadcrumb }) => (
  <Section>
    <div className="section__inner">
      <div className="section__top">
        <h2 className="section__heading">
          {breadcrumb && (
            <span className="section__breadcrumb">
              <Link to="/">Profile</Link>
            </span>
          )}
          {title && (
            <>
              {seeAllLink ? (
                <Link to={seeAllLink}>{title}</Link>
              ) : (
                <span>{title}</span>
              )}
            </>
          )}
        </h2>
        {seeAllLink && (
          <Link className="section__see-all" to={seeAllLink}>See All</Link>
        )}
      </div>
      {children}
    </div>
  </Section>
);

export default SectionWrapper;
