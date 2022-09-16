import styled from "styled-components";

interface ContainerProps {

    innerPageLink: number; //aux to show which inner page must be shown
    darkMode: boolean

}

export const Container = styled.div<ContainerProps>`

    display: flex;
    flex-direction: row;
    justify-content: center;

    @media(max-width: 1080px){
        flex-wrap: wrap;
        justify-content: center;
    }

    @media(max-width: 620px){
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    width: 100%;
    
    // loading effect
    .div-skeleton{
        height: 40vh;
        margin: 2rem 0;

        border-radius: 4px;

        animation: skeleton-loading 1s linear infinite alternate;

        .heading{
            display: none!important;;
        }

        @keyframes skeleton-loading{
            0%{
                background-color: #c0c0c0;
            }
            100%{
                background-color: #999999;
            }
        }

    }

    // content
    div.main-content{

        width: 55%;

        border-left: 2px solid #e6e6e6;
        border-right: 2px solid #e6e6e6;

        padding: 3rem 3rem 3rem 3rem;

        @media(max-width: 1080px){

            width: 70%;
            padding: 0 1rem ;
            border-right: none;
        }

        @media(max-width: 768px){
            width: 95%;
            border-left: none;
        }

        @media(max-width: 620px){
            padding: 1rem 0!important;

            width: 95%;
            border-left: none;
        }

        .search-mobile{

            display: none;
            
            @media(max-width: 768px){
                display: block;

                padding: 1rem 0 2rem 0;
            }

        }

        nav.links-inner-page{

            font-size: 2rem;
            font-weight: 600;

            margin-bottom: 2rem;

            a{
                margin-right: 2rem;
                color: #888888;
            }
            a.anime{
                color: ${props => props.darkMode === true && props.innerPageLink === 0 && `var(--brand-color)`};

                color: ${props => props.darkMode === false && props.innerPageLink === 0 && `var(--brand-color)`};
            } 
            a.manga{
                color: ${props => props.darkMode === true && props.innerPageLink === 1 && `var(--brand-color)`};

                color: ${props => props.darkMode === false && props.innerPageLink === 1 && `var(--brand-color)`};
            }
            a.movie{
                color: ${props => props.darkMode === true && props.innerPageLink === 2 && `var(--brand-color)`};

                color: ${props => props.darkMode === false && props.innerPageLink === 2 && `var(--brand-color)`};
            }

        }
        
        >section{
            display: flex;
            flex-direction: column;
        }

        // gets link clicked on Home and shows which section is correspondent
        section#anime, section#manga, section#movie {
            display: ${props => props.innerPageLink === 0 ? `flex` : `none`};

            div.heading{

                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;

                    margin: 2.6rem 0;

                    h2{
                        font-size: 1.6rem;
                        font-weight: 600;
                        color: ${props => props.darkMode ? 'var(--text-grey-variant)' : '#625e5e'};
                    }

                    >div.nav-buttons{
                        
                        
                    }

            }

            div.releasing-this-week{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                @media(max-width: 768px){
                    display: flex;
                    justify-content: flex-start;

                    overflow-y: auto;

                    >div{

                        min-width: 18rem;

                    }
                }

            }

            div.top-rated-animes{
                display: flex;
                flex-direction: row;

                @media(max-width: 768px){

                    overflow-y: auto;
                }
            }
        }

        section#manga {

            display: ${props => props.innerPageLink === 1 ? `flex` : `none`};
            
        }

        section#movie {

            display: ${props => props.innerPageLink === 2 ? `flex` : `none`};

        }

    }

    aside{
        width: 25%;

        padding: 2rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        @media(max-width: 1080px){
            padding: 0 1rem;
            width: 100%;

            .search{
                display: none;
            }

        }
        
        .trending{
            width: 100%;

            .trending-heading{

                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                margin: 2rem 0;

                h3{
                    color: ${props => props.darkMode ? 'var(--text-grey-variant)' : '#625e5e'};
                    font-size: 1.6rem;
                    font-weight: 600;
                }

                svg{
                    color: ${props => props.darkMode ? 'var(--text-grey-variant)' : '#625e5e'};
                    width: 15px;
                    height: auto;
                }

            }

            div.trending-items{

                a.button-see-more{
                    width: 100%;

                    display: flex;
                    justify-content: center;

                    padding: 1.3rem 0;
                    margin: 2rem 0;

                    font-size: 1.4rem;
                    font-weight: 600;
                    color: ${props => props.darkMode ? 'var(--brand-color)' : 'var(--pink-variant-1)'};

                    border-radius: 2px;
                    background-color: #ffd0e3;

                    :hover{

                        transition: all ease-in-out 200ms;

                        background-color: var(--brand-color);

                        color: var(--white);

                    }

                }

            }

        }
    }

`